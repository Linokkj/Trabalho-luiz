import { useState } from 'react'; 
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Menu from './com/Menu';
import Login from './com/Login';
import Dashboard from './Dashboard'; 

function App() {
  // Inicializa o estado buscando se já existe um usuário salvo no navegador
  const [user, setUser] = useState(() => {
    const usuarioSalvo = localStorage.getItem('usuario_logado');
    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
  });

  // --- ESTADOS DA PESQUISA ADICIONADOS ---
  const [busca, setBusca] = useState('');

  // Sua lista global de conteúdos (Filmes e Séries) para alimentar o sistema
  const conteudos = [
    { id: 1, titulo: 'Batman: O Cavaleiro das Trevas', tipo: 'filme', genero: 'Ação' },
    { id: 2, titulo: 'Interestelar', tipo: 'filme', genero: 'Ficção Científica' },
    { id: 3, titulo: 'Stranger Things', tipo: 'serie', genero: 'Mistério' },
    { id: 4, titulo: 'Matrix', tipo: 'filme', genero: 'Ficção Científica' },
    { id: 5, titulo: 'Breaking Bad', tipo: 'serie', genero: 'Drama' }
  ];

  // Filtra os filmes/séries em tempo real baseado no que for digitado
  const conteudosFiltrados = conteudos.filter((item) =>
    item.titulo.toLowerCase().includes(busca.toLowerCase())
  );
  // ----------------------------------------

  // Função para salvar os dados do usuário ao fazer login
  const handleLogin = (dadosDoUsuario) => {
    setUser(dadosDoUsuario);
    localStorage.setItem('usuario_logado', JSON.stringify(dadosDoUsuario));
  };

  // Função para limpar os dados do usuário ao fazer logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('usuario_logado');
  };

  return (
    <div className='app-container'> 
      <Router>
        <Routes>
          {/* Rota Pública (Menu Principal) - Recebe o texto da busca, a função para alterar e a lista filtrada */}
          <Route 
            path="/" 
            element={
              <Menu 
                user={user} 
                onLogout={handleLogout} 
                busca={busca}
                setBusca={setBusca}
                resultados={conteudosFiltrados}
              />
            } 
          />
          
          {/* Rota de Login */}
          <Route path="/login" element={<Login onLogin={handleLogin} user={user} />} />
          
          {/* Rota Protegida (Dashboard) */}
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} 
          />
        </Routes>
      </Router>
    </div> 
  );
}

export default App;