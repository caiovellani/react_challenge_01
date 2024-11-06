import { useState } from 'react';
import './index.css';
import { login } from './utils';

// Instruções:
// * Você tem um formulário de login INCOMPLETO
// * Não é permitido adicionar novos elementos HTML
// * Não é permitido usar refs
//
// Tarefas:
// Desabilite o botão de Login caso o e-mail esteja em branco OU a senha for menor que 6 dígitos. - OK
// O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários. - OK
// Desabilite o botão de Login equanto você está executando o login.
// Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login.
// Mostre um alerta caso o login seja efetuado com sucesso (javascript alert). Investigue a função login() para entender como ter sucesso na requisição.

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isRequesting, setIsRequesting] = useState(false)

  function handleEmailLoginForm(event) {
    const { value } = event.target
    setEmail(value)
  }

  function handlePasswordLoginForm(event) {
    const { value } = event.target
    setPassword(value)
  }

  function handleSubmitLoginForm() {
    let values = { email: email, password: password }

    setError(null)
    setIsRequesting(true)

    login(values)
      .then(() => {
        alert('Login efetuado com sucesso!')
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setIsRequesting(false)
    })
  }

  return (
    <div className='wrapper'>
      <div className='login-form'>
        <h1>Login Form 🐞</h1>
        {/* Coloque a mensagem de erro de login na div abaixo. Mostre a div somente se houver uma mensagem de erro. */}
        {error &&<div className='errorMessage'>{error.message}</div>}
        <div className='row'>
          <label htmlFor={'email'}>Email</label>
          <input 
            id={'email'} 
            type={'email'} 
            value={email} 
            onChange={handleEmailLoginForm} 
            autoComplete='off' 
          />
        </div>
        <div className='row'>
          <label htmlFor={'password'}>Password</label>
          <input 
            id={'password'} 
            type={'password'} 
            value={password}
            onChange={handlePasswordLoginForm}
          />
        </div>

        <div className='button'>
          <button 
            onClick={handleSubmitLoginForm}
            disabled={email === '' || password.length < 6 || isRequesting}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
