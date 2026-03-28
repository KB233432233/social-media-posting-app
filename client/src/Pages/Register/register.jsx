import './register.css'
import Logo from '../../assets/photo_2024-02-06_11-20-39.jpg'
import SignIn from '../../components/SignIn'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Auth, isGuest } from '../../auth';
import { useNavigate } from 'react-router-dom'
import { useValues } from '../../context/useValues';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const { updateId } = useValues();

  useEffect(() => {
    if (!isGuest()) navigate('/page');
    setLoad(true);
  }, [])

  const [renderSignIn, setRenderSignIn] = useState(false);
  const [inputs, setInputs] = useState({
    name: '',
    username: '',
    password: '',
  })
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.post('/api/auth/register', inputs);
    Auth(res.data, updateId);
    navigate('/page')
  }


  return load && (
    <div className='register-page-container'>
      <div className={`left-side ${renderSignIn ? 'opacity-reducer' : ''}`} onClick={() => renderSignIn ? setRenderSignIn(false) : null}>
        <img src={Logo} alt="" />
      </div>
      <div className={`right-side ${renderSignIn ? 'opacity-reducer' : ''}`} onClick={() => renderSignIn ? setRenderSignIn(false) : null}>
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit} className='inputs'>
          <input type="text" placeholder='name' value={inputs.name} onChange={(e) => setInputs({ ...inputs, name: e.target.value })} required />
          <input type="text" placeholder='userame' value={inputs.username} onChange={(e) => setInputs({ ...inputs, username: e.target.value })} required />
          <input type="password" placeholder='password' value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} required />
          <button type='submit' className='submit-button'>submit</button>
        </form>
        <button onClick={() => setRenderSignIn(true)}>Sign in</button>
      </div>
      {renderSignIn && <SignIn />}
    </div>
  )
}

