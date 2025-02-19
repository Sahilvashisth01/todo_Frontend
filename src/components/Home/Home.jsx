import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Home.css'

function Home() {
  const navigate = useNavigate(); // Initialize the navigation hook

  const handleNavigation = () => {
    navigate('/todo'); // Navigate to the /todo route
  };
  return (
    <>
    <div className="home">
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <h1 className="text-center">
            Organize your<br/> work and life,finally.
        </h1>
        <p>
            Become focused,orgainized,and calm with<br/>
            todo app.The world's #1 task manager app.
        </p>
        <button className='home-btn p-2' onClick={handleNavigation}>Make todo List</button>

      </div>
    </div>
    </>
  );
}

export default Home
