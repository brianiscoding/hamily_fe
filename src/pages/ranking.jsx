import React, { useEffect, useState } from "react";
import "./ranking.css";

const Rank = () => {
  const [loading, set_loading] = useState(true);
  const [students, set_students] = useState([]);

  const fetchData = () => {
    // fetch("http://localhost:8800/api/students/get_all")
    fetch("https://hamily-be.onrender.com/api/students/all")
      .then((res) => res.json())
      .then((data) => {
        set_students(data);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        set_loading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="ranking">
      {students.map((student, i) => (
        <div key={i}>
          <h2>
            Card {i + 1} {student.first} {student.last}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default Rank;
