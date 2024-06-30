import React, { useState } from 'react';
import { account } from '../lib/appwrite';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function login(email, password) {
    await account.createEmailPasswordSession(email, password);
    navigate('/home');
  }

  return (
    <div>
      <form>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="button" onClick={() => login(email, password)}>Login</button>
      </form>
    </div>
  );
};

export default Login;
