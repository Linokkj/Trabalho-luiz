import { useNavigate } from 'react-router-dom';

export default function Dashboard({ user, onLogout }) {
  const navigate = useNavigate();

  // Impede que o componente tente renderizar propriedades se o usuário for nulo
  if (!user) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Carregando...</div>;
  }

  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Login Efetuado com Sucesso!</h1>
      <p style={{ margin: '20px 0', fontSize: '18px' }}>
        Bem-vindo à sua área restrita, <b>{user.email}</b>.
      </p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '30px' }}>
        {/* Retorna para a Home mantendo a sessão do usuário salva */}
        <button 
          onClick={() => navigate('/')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#355384',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Voltar para o Início
        </button>

        {/* Executa o logout e limpa o localStorage antes de redirecionar */}
        <button 
          onClick={() => {
            onLogout();
            navigate('/');
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#d3792f',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Sair da Conta (Logout)
        </button>
      </div>
    </div>
  );
}