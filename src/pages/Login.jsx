"use client";
import React, { useState } from 'react';
import { account } from '../lib/appwrite';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function login(email, password) {
    await account.createEmailPasswordSession(email, password);
    navigate('/home');
  }

  return (
    <div className='bg-slate-700'>
      <div className="overflow-x-auto">
        <Tabs aria-label="Full width tabs" variant="fullWidth">
          <Tabs.Item active title="Admin Login" icon={HiUserCircle}>
            <form className="flex max-w-md flex-col gap-4 items-center">
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

              <Button type="button" onClick={() => login(email, password)} >Login</Button>
            </form>
          </Tabs.Item>

          <Tabs.Item title="Superviosr Login" icon={MdDashboard}>
            <form className="flex max-w-md flex-col gap-4 items-center">
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

              <Button type="button" onClick={() => login(email, password)} >Login</Button>
            </form>
          </Tabs.Item>

          <Tabs.Item disabled title="Employee Login">
            <form className="flex max-w-md flex-col gap-4 items-center">
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

              <Button type="button" onClick={() => login(email, password)} >Login</Button>
            </form>
          </Tabs.Item>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;