import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ranking.css";
import axios from "axios";

const Rank = () => {
  const [loading, set_loading] = useState(true);
  const [students, set_students] = useState([]);
  // const [user] = useOutletContext();
  const { year } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) return;
    axios
      .get(`${process.env.REACT_APP_BE_URL}/students/ranking/${year}`)
      .then((data) => set_students(data.data))
      .catch((err) => set_students([]))
      .finally(() => set_loading(true));
  }, [year]);

  return (
    <div className="ranking">
      <div>Ranking</div>
      {["Freshman", "Sophomore", "Junior", "Senior", "All"].map((e, i) => (
        <button key={i} onClick={() => navigate(`/ranking/${e.toLowerCase()}`)}>
          {e}
        </button>
      ))}
      {students.map((student, i) => (
        <div className="card" key={i}>
          <div className="picture">
            <img
              src={`https://www.hamilton.edu/photos/${student.school_id}.jpg`}
              // src={logo}
              alt="profile picture"
            ></img>
          </div>
          <div className="name">
            {student.first} {student.last}
          </div>
          <div className="split">
            {student.known_bys} / {student.knows}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Rank;
