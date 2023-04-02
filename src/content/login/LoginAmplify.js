import { useEffect} from 'react';
import { Amplify, I18n } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';


import useAuth from 'src/hooks/useAuth';


I18n.setLanguage('es');
const dict = {
  es: {
    'Sign in': 'Iniciar Sesión',
    'Forgot your password?': 'Olvidó su contraseña?',
    'Enter your Email': 'Ingrese su email',
    'Enter your Password': 'Ingrese su contraseña',
    'Reset Password': 'Restablecer Contraseña',
    'Enter your email': 'Ingrese su email',
    'Send code': 'Enviar código',
    'Back to Sign In': 'Regresar a Iniciar Sesión',
    'Signing in': 'Iniciando...',
    'Incorrect username or password.': 'Email o contraseña incorrecta.',
    'Sending': 'Enviando',
    'Submitting': 'Enviando',
    'Attempt limit exceeded, please try after some time.': 'Se excedió el límite de intentos, intente después de un tiempo.',
    'Code': 'Código',
    'Code *': 'Código *',
    'New Password': 'Nueva Contraseña',
    'Confirm Password': 'Confirmar Contraseña',
    'Submit': 'Enviar',
    'Resend Code': 'Reenviar Código'
  }
};

I18n.putVocabularies(dict);


export function Login({ signOut, user }){
  const { login } = useAuth();
  
  useEffect(()=>{
    const handleSignIn = async(user)=>{
      await login(user);
    }
  
    handleSignIn(user)
  },[])

  return null;
}
    

export default function LoginAmplify() {
    return (<Authenticator 
    // formFields={formFields}
    variation='modal'
    loginMechanisms={['email']}
    hideSignUp={true} >
       {({ signOut, user }) => (<Login signOut={signOut} user={user}></Login>)}
    </Authenticator>)

}