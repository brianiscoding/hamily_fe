import { useState, useEffect, useCallback } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import "./vote.css";
import logo from "../logo.svg";
import axios from "axios";
import Cookies from "js-cookie";

const Vote = () => {
  const [students, set_students] = useState([]);
  const [hasmore, set_hasmore] = useState(true);
  const [user] = useOutletContext();
  const { year, new_old } = useParams();
  const navigate = useNavigate();

  const fetch_students = useCallback(
    (max) => {
      // optomize by saving in session
      axios
        .get(
          `${process.env.REACT_APP_BE_URL}/students/vote/${year}/${new_old}/${max}`,
          { headers: { user_access_token: Cookies.get("user_access_token") } }
        )
        .then((data) => {
          set_students(data.data.students);
          if (data.data.max === students.length) {
            set_hasmore(false);
          }
        })
        .catch((err) => console.error(err));
    },
    [new_old, students.length, year]
  );

  useEffect(() => {
    if (!user) {
      set_students([]);
      return;
    }
    set_hasmore(true);
    fetch_students(20);
  }, [user, year, new_old, fetch_students]);

  const handle_vote = (other, type, i) =>
    axios
      .patch(
        `${process.env.REACT_APP_BE_URL}/students/vote`,
        {
          to: other._id,
          type,
        },
        { headers: { user_access_token: Cookies.get("user_access_token") } }
      )
      .then((data) => {
        if (new_old === "new") {
          set_students(students.filter((e, j) => i !== j));
        } else {
          set_students(
            students.map((e, j) => {
              if (i !== j) {
                return e;
              }
              return { ...e, type };
            })
          );
        }
      })
      .catch((err) => console.error(err));

  const render_types = (student, i) => {
    return (
      <div className="types">
        {["know_not", "know", "know_well"].map((type) => (
          <div
            key={type}
            className={student.type === type ? "on" : ""}
            onClick={() => handle_vote(student, type, i)}
          >
            {type.replace("_", " ")}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="wrapper_vote">
      <h1 className="header_vote">Vote</h1>
      <div className="filter">
        {["Freshman", "Sophomore", "Junior", "Senior"].map((e, i) => (
          <button
            key={i}
            onClick={() => navigate(`/vote/${e.toLowerCase()}/${new_old}`)}
          >
            {e}
          </button>
        ))}
        <button onClick={() => navigate(`/vote/${year}/new`)}>New</button>
        <button onClick={() => navigate(`/vote/${year}/old`)}>Old</button>
      </div>
      <InfiniteScroll
        dataLength={students.length}
        next={() => fetch_students(students.length + 100)}
        scrollableTarget="main"
        hasMore={hasmore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="students">
          {students.map((student, i) => (
            <div className="card" key={i}>
              <div className="picture">
                <img
                  // src={`https://www.hamilton.edu/photos/${student.school_id}.jpg`}
                  src={logo}
                  alt="profile"
                ></img>
              </div>
              <div className="name">
                {student.first} {student.last}
              </div>
              <div className="split">
                {student.known_bys} / {student.knows}
              </div>

              {render_types(student, i)}
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Vote;
