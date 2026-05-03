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
$cacheFile = $cacheDir . DIRECTORY_SEPARATOR . 'commercial-pricing.json';

function default_pricing(): array
{
    return [
        'version' => 1,
        'updatedAt' => gmdate('c'),
        'responsibleCount' => 2,
        'includedResponsibles' => 2,
        'extraResponsibleUnitValue' => 7500,
        'commercialAdjustmentRate' => 0,
        'selectedPaymentOptionId' => 'standard',
        'fixedItems' => [
            [
                'id' => 'base-project',
                'label' => 'Projeto base Protocolo Escudo',
                'description' => 'Implantacao essencial com diagnostico, gabinete, matriz inicial, materiais base e ate 2 responsaveis.',
                'value' => 50000,
                'enabled' => true,
                'locked' => true,
            ],
            [
                'id' => 'central-setup',
                'label' => 'Setup profissional da Central Escudo',
                'description' => 'Organizacao da biblioteca operacional, trilhas, governanca de versoes e pacote inicial de evidencias.',
                'value' => 15000,
                'enabled' => false,
            ],
            [
                'id' => 'executive-governance',
                'label' => 'Governanca executiva ampliada',
                'description' => 'Ritos adicionais com sponsor, comite, atas decisorias, relatorio executivo e acompanhamento senior.',
                'value' => 12000,
                'enabled' => false,
            ],
            [
                'id' => 'priority-response',
                'label' => 'Acionamento prioritario por 30 dias',
                'description' => 'Canal de resposta sensivel para duvidas criticas, ajustes de mensagem e suporte de primeira decisao.',
                'value' => 18000,
                'enabled' => false,
            ],
            [
                'id' => 'annual-retainer',
                'label' => 'Recorrencia anual de blindagem',
                'description' => 'Ciclo anual com revisoes, simulados leves, atualizacao de riscos e suporte estrategico programado.',
                'value' => 72000,
                'enabled' => false,
            ],
        ],
        'variableItems' => [
            [
                'id' => 'additional-units',
                'label' => 'Unidades ou operacoes adicionais',
                'description' => 'Filiais, plantas, marcas, regioes ou frentes operacionais alem do nucleo principal.',
                'quantity' => 0,
                'unitValue' => 12000,
                'unitLabel' => 'unidade',
            ],
            [
                'id' => 'extra-simulations',
                'label' => 'Simulados extras / The Worst Day',
                'description' => 'Rodadas adicionais de pressao, stress test, debriefing e plano corretivo por simulacao.',
                'quantity' => 0,
                'unitValue' => 18000,
                'unitLabel' => 'simulado',
            ],
            [
                'id' => 'spokespeople',
                'label' => 'Porta-vozes em preparacao intensiva',
                'description' => 'Treino individual, Q&A hostil, postura, entrevista simulada e feedback reservado.',
                'quantity' => 0,
                'unitValue' => 6500,
                'unitLabel' => 'porta-voz',
            ],
            [
                'id' => 'critical-materials',
                'label' => 'Materiais criticos adicionais',
                'description' => 'Playbooks, notas, Q&A, comunicados internos ou fluxos extras fora do pacote base.',
                'quantity' => 0,
                'unitValue' => 2500,
                'unitLabel' => 'material',
            ],
            [
                'id' => 'onsite-days',
                'label' => 'Dias presenciais / logistica tecnica',
                'description' => 'Dia presencial de equipe, facilitacao, deslocamento tecnico ou operacao assistida.',
                'quantity' => 0,
                'unitValue' => 4500,
                'unitLabel' => 'dia',
            ],
        ],
        'paymentOptions' => [
            [
                'id' => 'standard',
                'label' => 'Padrao 50 / 30 / 20',
                'description' => 'Fluxo recomendado para preservar agenda, caixa do projeto e ritmo de implantacao.',
                'rateAdjustment' => 0,
                'milestones' => '50% no aceite, 30% no kickoff operacional e 20% antes da entrega final.',
            ],
            [
                'id' => 'upfront',
                'label' => 'A vista no aceite',
                'description' => 'Condicao para fechamento rapido e menor custo administrativo.',
                'rateAdjustment' => -5,
                'milestones' => '100% no aceite da proposta, com 5% de desconto comercial automatico.',
            ],
            [
                'id' => 'two-installments',
                'label' => 'Duas parcelas',
                'description' => 'Opcao simples para empresas que preferem dividir sem alongar demais o risco financeiro.',
                'rateAdjustment' => 0,
                'milestones' => '60% no aceite e 40% antes da simulacao principal ou entrega consolidada.',
            ],
            [
                'id' => 'four-installments',
                'label' => 'Quatro parcelas mensais',
                'description' => 'Parcelamento com custo financeiro para compensar exposicao de agenda e equipe.',
                'rateAdjustment' => 4,
                'milestones' => '4 parcelas mensais, com acrescimo de 4% sobre o subtotal aprovado.',
            ],
        ],
    ];
}

function numeric_value(mixed $value, float|int $fallback = 0): float|int
{
    return is_numeric($value) && (float) $value >= 0 ? $value + 0 : $fallback;
}

function signed_numeric_value(mixed $value, float|int $fallback = 0): float|int
{
    return is_numeric($value) ? $value + 0 : $fallback;
}

function normalize_config(mixed $payload): array
{
    $defaults = default_pricing();
    $source = is_array($payload) ? $payload : [];

    $fixedItems = [];
    foreach ($defaults['fixedItems'] as $defaultItem) {
        $match = null;
        foreach (($source['fixedItems'] ?? []) as $candidate) {
            if (is_array($candidate) && ($candidate['id'] ?? null) === $defaultItem['id']) {
                $match = $candidate;
                break;
            }
        }

        $fixedItems[] = array_merge($defaultItem, [
            'value' => numeric_value($match['value'] ?? null, $defaultItem['value']),
            'enabled' => !empty($defaultItem['locked']) ? true : (bool) ($match['enabled'] ?? $defaultItem['enabled']),
        ]);
    }

    $variableItems = [];
    foreach ($defaults['variableItems'] as $defaultItem) {
        $match = null;
        foreach (($source['variableItems'] ?? []) as $candidate) {
            if (is_array($candidate) && ($candidate['id'] ?? null) === $defaultItem['id']) {
                $match = $candidate;
                break;
            }
        }

        $variableItems[] = array_merge($defaultItem, [
            'quantity' => numeric_value($match['quantity'] ?? null, $defaultItem['quantity']),
            'unitValue' => numeric_value($match['unitValue'] ?? null, $defaultItem['unitValue']),
        ]);
    }

    $paymentOptions = [];
    foreach ($defaults['paymentOptions'] as $defaultItem) {
        $match = null;
        foreach (($source['paymentOptions'] ?? []) as $candidate) {
            if (is_array($candidate) && ($candidate['id'] ?? null) === $defaultItem['id']) {
                $match = $candidate;
                break;
            }
        }

        $paymentOptions[] = array_merge($defaultItem, [
            'rateAdjustment' => signed_numeric_value($match['rateAdjustment'] ?? null, $defaultItem['rateAdjustment']),
        ]);
    }

    $selectedPaymentOptionId = $source['selectedPaymentOptionId'] ?? $defaults['selectedPaymentOptionId'];
    $validPaymentIds = array_column($paymentOptions, 'id');

    return array_merge($defaults, [
        'updatedAt' => gmdate('c'),
        'responsibleCount' => max(
            $defaults['includedResponsibles'],
            (int) numeric_value($source['responsibleCount'] ?? null, $defaults['responsibleCount'])
        ),
        'extraResponsibleUnitValue' => numeric_value(
            $source['extraResponsibleUnitValue'] ?? null,
            $defaults['extraResponsibleUnitValue']
        ),
        'commercialAdjustmentRate' => signed_numeric_value(
            $source['commercialAdjustmentRate'] ?? null,
            $defaults['commercialAdjustmentRate']
        ),
        'selectedPaymentOptionId' => in_array($selectedPaymentOptionId, $validPaymentIds, true)
            ? $selectedPaymentOptionId
            : $defaults['selectedPaymentOptionId'],
        'fixedItems' => $fixedItems,
        'variableItems' => $variableItems,
        'paymentOptions' => $paymentOptions,
    ]);
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
        throw new RuntimeException('Nao foi possivel gravar o cache comercial.');
    }
}

function read_cache(string $cacheDir, string $cacheFile): array
{
    if (!is_file($cacheFile)) {
        $defaults = normalize_config(default_pricing());
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
        $defaults = normalize_config(default_pricing());
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
