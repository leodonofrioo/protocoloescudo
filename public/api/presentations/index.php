<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$cacheDir = dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . '.server-cache';
$cacheFile = $cacheDir . DIRECTORY_SEPARATOR . 'presentations.json';

function slide_keys(string $prefix, int $count): array
{
    $items = [];
    for ($index = 1; $index <= $count; $index++) {
        $items[] = $prefix . '-' . $index;
    }
    return $items;
}

function default_presentations(): array
{
    return [
        'version' => 1,
        'updatedAt' => gmdate('c'),
        'commercial' => [
            'investmentFactors' => [
                'Número de lideranças envolvidas',
                'Quantidade de unidades, áreas ou filiais',
                'Gravidade dos riscos mapeados',
                'Intensidade das simulações',
                'Necessidade de suporte recorrente',
                'Participação de especialistas externos',
                'Profundidade da Central Escudo',
            ],
            'plans' => [
                [
                    'id' => 'essential',
                    'name' => 'Escopo Essencial',
                    'shortName' => 'Essencial',
                    'minValue' => 50000,
                    'maxValue' => 90000,
                    'description' => 'Estrutura essencial para empresas com liderança centralizada e necessidade inicial de resposta.',
                    'items' => ['Diagnóstico', 'Gabinete de Crise', 'Fluxos essenciais', 'Capacitação base', 'Simulação controlada'],
                ],
                [
                    'id' => 'executive',
                    'name' => 'Escopo Executivo',
                    'shortName' => 'Executivo',
                    'minValue' => 100000,
                    'maxValue' => 180000,
                    'description' => 'Implantação executiva para empresas com múltiplas áreas, riscos relevantes e maior exposição.',
                    'items' => ['Riscos ampliados', 'Central Escudo mais completa', 'Mais lideranças capacitadas', 'Testes adicionais'],
                ],
                [
                    'id' => 'institutional',
                    'name' => 'Escopo Institucional',
                    'shortName' => 'Institucional',
                    'minValue' => 200000,
                    'maxValue' => 300000,
                    'description' => 'Blindagem institucional para empresas complexas, conselhos, múltiplas unidades ou alta exposição.',
                    'items' => ['Implantação ampliada', 'Simulações avançadas', 'Suporte estratégico intenso', 'Blindagem robusta'],
                ],
            ],
        ],
        'customSlides' => [],
        'versions' => [
            [
                'id' => 'complete',
                'slug' => 'completa',
                'name' => 'Protocolo Escudo - Apresentação Completa',
                'deckLabel' => 'Apresentação completa',
                'description' => 'Versão comercial completa para reuniões com decisores, conselhos e lideranças.',
                'slideKeys' => slide_keys('complete', 29),
                'updatedAt' => gmdate('c'),
                'locked' => true,
            ],
            [
                'id' => 'summary',
                'slug' => 'resumida',
                'name' => 'Protocolo Escudo - Versão Resumida',
                'deckLabel' => 'Versão resumida',
                'description' => 'Versão curta para abertura de reunião, diagnóstico comercial rápido e follow-up executivo.',
                'slideKeys' => slide_keys('summary', 15),
                'updatedAt' => gmdate('c'),
                'locked' => true,
            ],
        ],
    ];
}

function numeric_value(mixed $value, int|float $fallback): int|float
{
    return is_numeric($value) && (float) $value >= 0 ? $value + 0 : $fallback;
}

function text_value(mixed $value, string $fallback): string
{
    return is_string($value) && trim($value) !== '' ? trim($value) : $fallback;
}

function text_array(mixed $value, array $fallback): array
{
    if (!is_array($value)) {
        return $fallback;
    }

    $items = array_values(array_filter(array_map(static function ($item) {
        return is_string($item) ? trim($item) : '';
    }, $value)));

    return count($items) > 0 ? $items : $fallback;
}

function slug_value(mixed $value, string $fallback): string
{
    $raw = strtolower(text_value($value, $fallback));
    $raw = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $raw) ?: $raw;
    $slug = preg_replace('/[^a-z0-9]+/', '-', $raw) ?? '';
    $slug = trim($slug, '-');
    return $slug !== '' ? $slug : $fallback;
}

function normalize_plan(mixed $payload, array $fallback): array
{
    $source = is_array($payload) ? $payload : [];
    $minValue = numeric_value($source['minValue'] ?? null, $fallback['minValue']);
    $maxValue = numeric_value($source['maxValue'] ?? null, $fallback['maxValue']);

    return array_merge($fallback, [
        'id' => slug_value($source['id'] ?? null, $fallback['id']),
        'name' => text_value($source['name'] ?? null, $fallback['name']),
        'shortName' => text_value($source['shortName'] ?? null, $fallback['shortName']),
        'minValue' => $minValue,
        'maxValue' => max($minValue, $maxValue),
        'description' => text_value($source['description'] ?? null, $fallback['description']),
        'items' => text_array($source['items'] ?? null, $fallback['items']),
    ]);
}

function normalize_version(mixed $payload, array $fallback): array
{
    $source = is_array($payload) ? $payload : [];

    return array_merge($fallback, [
        'id' => slug_value($source['id'] ?? null, $fallback['id']),
        'slug' => slug_value($source['slug'] ?? null, $fallback['slug']),
        'name' => text_value($source['name'] ?? null, $fallback['name']),
        'deckLabel' => text_value($source['deckLabel'] ?? null, $fallback['deckLabel']),
        'description' => text_value($source['description'] ?? null, $fallback['description']),
        'slideKeys' => text_array($source['slideKeys'] ?? null, $fallback['slideKeys']),
        'updatedAt' => gmdate('c'),
        'locked' => (bool) ($source['locked'] ?? $fallback['locked'] ?? false),
    ]);
}

function normalize_slide(mixed $payload): ?array
{
    if (!is_array($payload)) {
        return null;
    }

    $title = text_value($payload['title'] ?? null, '');
    if ($title === '') {
        return null;
    }

    return [
        'id' => slug_value($payload['id'] ?? null, 'custom-' . time()),
        'libraryLabel' => text_value($payload['libraryLabel'] ?? null, $title),
        'eyebrow' => text_value($payload['eyebrow'] ?? null, 'Slide personalizado'),
        'title' => $title,
        'text' => text_array($payload['text'] ?? null, ['Conteúdo comercial a revisar.']),
        'tone' => text_value($payload['tone'] ?? null, 'dark'),
        'visual' => is_array($payload['visual'] ?? null)
            ? $payload['visual']
            : ['type' => 'checklist', 'items' => ['Ponto principal', 'Decisão necessária', 'Próximo passo']],
    ];
}

function normalize_config(mixed $payload): array
{
    $defaults = default_presentations();
    $source = is_array($payload) ? $payload : [];
    $sourceCommercial = is_array($source['commercial'] ?? null) ? $source['commercial'] : [];
    $incomingPlans = is_array($sourceCommercial['plans'] ?? null) ? $sourceCommercial['plans'] : [];

    $plans = [];
    foreach ($defaults['commercial']['plans'] as $defaultPlan) {
        $match = null;
        foreach ($incomingPlans as $candidate) {
            if (is_array($candidate) && ($candidate['id'] ?? null) === $defaultPlan['id']) {
                $match = $candidate;
                break;
            }
        }
        $plans[] = normalize_plan($match, $defaultPlan);
    }

    $incomingVersions = is_array($source['versions'] ?? null) ? $source['versions'] : [];
    $versions = [];
    foreach ($defaults['versions'] as $defaultVersion) {
        $match = null;
        foreach ($incomingVersions as $candidate) {
            if (is_array($candidate) && ($candidate['id'] ?? null) === $defaultVersion['id']) {
                $match = $candidate;
                break;
            }
        }
        $versions[] = normalize_version($match, $defaultVersion);
    }

    foreach ($incomingVersions as $index => $candidate) {
        if (!is_array($candidate)) {
            continue;
        }
        $id = $candidate['id'] ?? '';
        $isDefault = false;
        foreach ($defaults['versions'] as $defaultVersion) {
            if ($id === $defaultVersion['id']) {
                $isDefault = true;
                break;
            }
        }
        if (!$isDefault) {
            $versions[] = normalize_version($candidate, [
                'id' => 'custom-version-' . ($index + 1),
                'slug' => 'versao-' . ($index + 1),
                'name' => 'Versão personalizada ' . ($index + 1),
                'deckLabel' => 'Versão personalizada ' . ($index + 1),
                'description' => 'Versão criada a partir do montador de apresentações.',
                'slideKeys' => array_slice(slide_keys('complete', 29), 0, 5),
                'updatedAt' => gmdate('c'),
                'locked' => false,
            ]);
        }
    }

    $customSlides = [];
    foreach (($source['customSlides'] ?? []) as $slide) {
        $normalizedSlide = normalize_slide($slide);
        if ($normalizedSlide !== null) {
            $customSlides[] = $normalizedSlide;
        }
    }

    return [
        'version' => 1,
        'updatedAt' => gmdate('c'),
        'commercial' => [
            'plans' => $plans,
            'investmentFactors' => text_array(
                $sourceCommercial['investmentFactors'] ?? null,
                $defaults['commercial']['investmentFactors']
            ),
        ],
        'customSlides' => $customSlides,
        'versions' => $versions,
    ];
}

function write_cache(string $cacheDir, string $cacheFile, array $config): void
{
    if (!is_dir($cacheDir) && !mkdir($cacheDir, 0755, true) && !is_dir($cacheDir)) {
        throw new RuntimeException('Nao foi possivel criar a pasta de cache.');
    }

    $denyFile = $cacheDir . DIRECTORY_SEPARATOR . '.htaccess';
    if (!is_file($denyFile)) {
        @file_put_contents(
            $denyFile,
            "<IfModule mod_authz_core.c>\nRequire all denied\n</IfModule>\n<IfModule !mod_authz_core.c>\nDeny from all\n</IfModule>\n",
            LOCK_EX
        );
    }

    $json = json_encode($config, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    if ($json === false || file_put_contents($cacheFile, $json . PHP_EOL, LOCK_EX) === false) {
        throw new RuntimeException('Nao foi possivel gravar o cache de apresentacoes.');
    }
}

function read_cache(string $cacheDir, string $cacheFile): array
{
    if (!is_file($cacheFile)) {
        $defaults = normalize_config(default_presentations());
        write_cache($cacheDir, $cacheFile, $defaults);
        return $defaults;
    }

    $content = file_get_contents($cacheFile);
    $decoded = json_decode($content === false ? '' : $content, true);

    return normalize_config($decoded);
}

try {
    $method = $_SERVER['REQUEST_METHOD'];
    $shouldReset = isset($_GET['reset']);

    if ($method === 'GET' && !$shouldReset) {
        echo json_encode(read_cache($cacheDir, $cacheFile), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }

    if (($method === 'POST' || $method === 'PUT') && $shouldReset) {
        $defaults = normalize_config(default_presentations());
        write_cache($cacheDir, $cacheFile, $defaults);
        echo json_encode($defaults, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }

    if ($method === 'POST' || $method === 'PUT') {
        $rawBody = file_get_contents('php://input');
        $payload = json_decode($rawBody === false ? '' : $rawBody, true);
        $normalized = normalize_config($payload);
        write_cache($cacheDir, $cacheFile, $normalized);
        echo json_encode($normalized, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }

    http_response_code(405);
    echo json_encode(['error' => 'Metodo nao permitido.']);
} catch (Throwable $error) {
    http_response_code(500);
    echo json_encode(['error' => $error->getMessage()], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}
