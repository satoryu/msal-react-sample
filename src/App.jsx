import './App.css'
import Report from './Report.jsx'


import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react'

const loginRequest = {
  scopes: ['https://analysis.windows.net/powerbi/api/.default']
}

const LoginButton = () => {
  const { instance } = useMsal()

  const handleLogin = () => {
    instance.loginRedirect(loginRequest)
  }

  return (
    <>
      <button onClick={() => handleLogin()}>Login</button>
    </>
  )
}

function App() {

  return (
    <div className="App">
      <AuthenticatedTemplate>
        <Report />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <div> Log in </div>
        <LoginButton />
      </UnauthenticatedTemplate>
    </div>
  )
}

export default App
