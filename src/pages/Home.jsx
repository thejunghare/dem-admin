"use client";
import React, { useEffect, useState } from 'react';
import { account } from '../lib/appwrite';
import { useNavigate } from 'react-router-dom';
import { Spinner, Badge, Button } from "flowbite-react";
import { FiLogOut } from "react-icons/fi";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userDetails = await account.get();
        setUser(userDetails);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUser();
  }, []);

  const logout = async () => {
    setDisable(true);
    await account.deleteSession('current');
    navigate('/login');
  };

  return (
    <div className='m-3'>
      {user ? (
        <div className='flex flex-row items-center justify-between'>
          <div className='flex flex-row items-center justify-start'>
            <h1 className='text-base font-semibold'>Welcome, {user.name}</h1>
            <Badge color="failure" className='ml-2'>{user.labels}</Badge>
          </div>
          <div>
            <Button
              onClick={logout}
              isProcessing={disable}
              size="sm"
              pill
              outline
            >
              Logout
              <FiLogOut className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative m-6 w-screen h-screen outline-dashed outline-1 outline-black">
          <div className="absolute w-[50px] h-[50px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Spinner aria-label="Loading..." />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
