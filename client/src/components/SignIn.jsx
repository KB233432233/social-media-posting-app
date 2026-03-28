import { useState } from 'react'
import axios from 'axios';
import { Auth } from '../auth';
import { useNavigate } from 'react-router-dom';

function SignIn() {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        username: '',
        password: '',
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post('/api/auth/login', inputs);
        Auth(res.data);
        navigate('/page');
    }

    return (
        <form onSubmit={e => handleSubmit(e)} className='signin-prompet'>
            <div className='input-div'>
                <label htmlFor="username">Username</label>
                <input type="text" placeholder='type your username' id='name' name='username' required
                    value={inputs.username} onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                />
            </div>
            <div className='input-div'>
                <label htmlFor="password">Password</label>
                <input type="password" placeholder='type your password' id='password' required
                    value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                />
            </div>
            <button type='submit' className='signin-btn greenback'>Sign In</button>

        </form>
    )
}

export default SignIn
