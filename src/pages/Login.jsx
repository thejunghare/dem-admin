import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { account } from '../lib/appwrite';
import { Button, Label, TextInput } from "flowbite-react";
import { FiLogIn } from "react-icons/fi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);

  const loginFailed = (error) => toast(`Failed! ${error}`);
  const loginSuccess = () => toast("Welcome back!");

  const login = async (email, password) => {
    setDisable(true);
    try {
      await account.createEmailPasswordSession(email, password);
      loginSuccess();
      onLogin();
      navigate('/home');
    } catch (error) {
      loginFailed(error.message);
      setDisable(false);
    }
  };

  return (
    <div className=''>
      <ToastContainer />
      <div className="relative m-6 w-screen h-screen outline-dashed outline-1 outline-black">
        <div className="absolute w-[50px] h-[50px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <form className="flex flex-col gap-4 items-center">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Your email" />
              </div>
              <TextInput id="email1" type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Your password" />
              </div>
              <TextInput id="password1" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <Button type="button" isProcessing={disable} onClick={() => login(email, password)} size="sm" pill>
              Login
              <FiLogIn className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </div >
  );
};

export default Login;
