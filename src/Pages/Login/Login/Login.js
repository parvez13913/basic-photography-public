import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import Social from '../Social/Social';

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const [
        signInWithEmailAndPassword,
        user,
      ] = useSignInWithEmailAndPassword(auth);

      const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);

    const handleEmailField = event => {
        setEmail(event.target.value);
    }
    const handlePasswordField = event => {
        setPassword(event.target.value);
    }

    const handelSubmit = event => {
        event.preventDefault();
        signInWithEmailAndPassword(email,password);
    }
    const resetPassword = async() => {
        if(email){
            await sendPasswordResetEmail(email);
            toast('Sent Email')
        }
        else{
            toast('Please Enter Your Email');
        }
    }
    if(user){
        navigate(from,{replace: true});
    }

    return (
    <div>
        <div className='container w-50 border border-light mt-5 p-3 rounded bg-light.bg-gradient shadow-lg'>
           <h1 className='mx-auto mt-5'>Please Login</h1>
           <form onSubmit={handelSubmit}>
               <div className="my-3">
                    <input onBlur={handleEmailField} type="email" className="form-control" id="Email1" placeholder='Enter Your Email' required/>
               </div>
                <div className="my-3">
                   <input onBlur={handlePasswordField} type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter Your Password' required/>
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
                <Social></Social>
                <p className='my-3'>New to Basic Photography?? <Link to='/register' className='text-danger text-decoration-none h6'>Please Register</Link></p>
                <p className='my-3'>Forget Password?? <span onClick={resetPassword} className='text-primary text-decoration-none h6 pointer'> Reset Password</span></p>
            </form>
        </div>
        <div className='text-center'>
          <ToastContainer/>
        </div>
    </div>    
    );
};

export default Login;