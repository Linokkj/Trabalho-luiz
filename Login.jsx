import { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login({ onLogin, user }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  
  const navigate = useNavigate();

  // Segurança: Se já houver usuário ativo, manda para a página inicial
  useEffect(() => {
    if (user && user.email) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); 

    // RegEx para aceitar rigorosamente qualquer endereço @gmail.com
    const regexGmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (regexGmail.test(email)) {
      if (password.length < 6) {
        setError('A senha deve tener pelo menos 6 dígitos para o teste.');
        return;
      }

      // Separa o texto antes do '@' para salvar como o nome de exibição
      const nomeUsuario = email.split('@')[0];

      onLogin({ 
        email: email, 
        name: nomeUsuario 
      });
      
      navigate('/dashboard'); 
    } else {
      setError('Por favor, insira um e-mail válido do Gmail (ex: usuario@gmail.com).');
    }
  };

  return (
    <div className="login">
      <div className="loginS">
        {/* Ícone Decorativo que simula o template */}
        <div className="logo">
          <p>Logo</p>
        </div>

        <h2>Fazer login</h2>
        <p className="subtitulo">Use qualquer Conta do Gmail para testar</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="inputs">
            <label htmlFor="email">E-mail do Gmail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder=""
              className={error && !email.includes('@gmail.com') ? 'input-error' : ''}
            />
          </div>

          <div className="inputs">
            <label htmlFor="password">Digite sua senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder=""
              className={error && password.length < 6 ? 'input-error' : ''}
            />
          </div>


          <button type="submit" className="btn-subtitulo">
            Avançar
          </button>

          
        </form>

        <div className="footerMenu">
          <span onClick={() => navigate('/')}>Voltar ao Menu</span>
        </div>
      </div>
    </div>
  );
}