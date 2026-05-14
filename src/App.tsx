import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import Hub from './pages/Hub';
import Detalhamento from './pages/Detalhamento';
import DiagnosticoExecutivo from './pages/DiagnosticoExecutivo';
import TheWorstDay from './pages/TheWorstDay';
import MatrizRiscos from './pages/MatrizRiscos';
import CentralProntidao from './pages/CentralProntidao';
import GabineteCrise from './pages/GabineteCrise';
import PrecosPoliticasComerciais from './pages/PrecosPoliticasComerciais';
import Apresentacao from './pages/Apresentacao';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="app-container">
        {/* Glassmorphism Topbar */}
        <header className="topbar no-print">
          <Link to="/" className="topbar-brand">
            <img src="/images/Logo.webp" alt="Protocolo Escudo" className="topbar-logo-img logo-dynamic" style={{ height: '28px', objectFit: 'contain' }} />
            <div className="topbar-text">
              <div className="topbar-title">Central de Arquivos</div>
            </div>
          </Link>
          
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="dark-mode-toggle"
            title="Alternar Modo Escuro"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Hub />} />
            <Route path="/detalhamento" element={<Detalhamento />} />
            <Route path="/diagnostico" element={<DiagnosticoExecutivo />} />
            <Route path="/the-worst-day" element={<TheWorstDay />} />
            <Route path="/matriz-riscos" element={<MatrizRiscos />} />
            <Route path="/central-prontidao" element={<CentralProntidao />} />
            <Route path="/gabinete-crise" element={<GabineteCrise />} />
            <Route path="/precos-politicas-comerciais" element={<PrecosPoliticasComerciais />} />
            <Route path="/apresentacao" element={<Apresentacao />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
