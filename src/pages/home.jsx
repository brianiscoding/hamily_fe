import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const [user] = useOutletContext();
  useEffect(() => {}, []);

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      {user ? (
        <div>
          <h3>User Logged in</h3>
          <p>
            Name: {user.first} {user.last}
          </p>
          <p>Email Address: {user.email}</p>
          <br />
          <br />
        </div>
      ) : (
        <div onClick={() => console.log(user)}>hi</div>
      )}
    </div>
  );
};

export default Home;
