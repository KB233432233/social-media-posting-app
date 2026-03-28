import { useEffect, useState, } from 'react'
import './Auth.css'
import Logo from '../../assets/photo_2024-02-06_11-20-39.jpg'
import { useNavigate } from 'react-router-dom';
import SignIn from '../../components/SignIn';
import { isGuest } from '../../auth';

export default function Auth() {
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);

    useEffect(() => {
        if (!isGuest()) navigate('/page');
        setLoad(true);
    }, [])


    const [renderSignIn, setRenderSignIn] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return load && (
        <div className='auth-page-container'>
            <div className={`left-side ${renderSignIn ? 'opacity-reducer' : ''}`} onClick={() => renderSignIn ? setRenderSignIn(false) : null}>
                <img src={Logo} alt="twitterLogo" />
            </div>
            <div className={`right-side ${renderSignIn ? 'opacity-reducer' : ''}`} onClick={() => renderSignIn ? setRenderSignIn(false) : null}>
                <h1>Happening now</h1>
                <p>join tody</p>
                <div className="btns">
                    <button className='google-signup-btn'>Sign up with Google</button>
                    <button className='apple-signup-btn'>Sign up with Apple</button>
                    <div className='or-text'><p>or</p></div>
                    <button className='create-account-btn' onClick={() => navigate('/register')}>Create account</button>
                    <div className="already-have-account">
                        <p className='already-have-account-text'>Already have account?</p>
                        <button className='signin-btn' onClick={() => setRenderSignIn(true)}>Sign in</button>
                    </div>
                </div>
            </div>
            {renderSignIn && <SignIn />}
        </div>
    )
}