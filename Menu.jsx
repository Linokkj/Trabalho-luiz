import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function Menu({ user, onLogout, busca, setBusca }) {
  const navigate = useNavigate();
  // Controla se a caixinha de pesquisa está aberta ou fechada dentro do menu
  const [mostrarBusca, setMostrarBusca] = useState(false);

  return (
    <nav className="Menu">
      
      <div className="btn">
        <button onClick={() => navigate('/')} className="nav-link active">Início</button>
        <button onClick={() => navigate('/')} className="nav-link">Filmes</button>
        <button onClick={() => navigate('/')} className="nav-link">Séries</button>
      </div>

      <div className="nav-right">
        
        {/* O INPUT APARECE AQUI (Do lado esquerdo da lupa) */}
        {mostrarBusca && (
          <input 
            type="text" 
            placeholder="Busca..." 
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="menu-inline-search"
            autoFocus
          />
        )}
        
        {/* Botão circular da Lupa */}
        <div 
          className={`span ${mostrarBusca ? 'lupa-ativa' : ''}`} 
          onClick={() => setMostrarBusca(!mostrarBusca)}
        >
          <img 
            className="imagem" 
            src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><circle cx='11' cy='11' r='8'></circle><line x1='21' y1='21' x2='16.65' y2='16.65'></line></svg>" 
            alt="Pesquisa" 
          />
        </div>

        {/* Verificação dinâmica de login */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Link to="/dashboard" className="nav-link assinaturas-link">
              Minha Conta
            </Link>
            <button onClick={onLogout} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
              Sair
            </button>
          </div>
        ) : (
          <Link to="/login" className="nav-link assinaturas-link">
            Assinaturas
          </Link>
        )}

      </div>
    </nav>
  );
}