import { useState, useEffect } from "react";

import axios from "axios";

const Vote = () => {
  const [cards, set_cards] = useState([]);

  const login = (token) => {
    // check valid login
    axios
      .get("http://localhost:8080/api/auth/login", {
        withCredentials: true,
      })
      .then((data) => {})
      .catch((err) => {
        console.error(err.response.data);
      })
      .finally(() => {});
  };

  useEffect(() => {
    // check for cookie
    if (true) {
      // no cookie => no user
      return;
    }
  }, []);

  return <h1>Vote</h1>;
};

export default Vote;
