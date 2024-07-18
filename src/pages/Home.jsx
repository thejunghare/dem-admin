import React, { useEffect, useState } from 'react';
import { account } from '../lib/appwrite';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
    await account.deleteSession('current');
    navigate('/');
  };

  return (
    <div>
      {user ? (
        <div className='welcome-container'>
          <h1>Welcome, {user.name}</h1>
          <p>Email: {user.email}</p>
          <Button onClick={logout} variant="danger" size='sm'>Logout</Button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;
