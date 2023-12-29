import "./contacts.css";
import logo from "../logo.svg";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

const Contact = () => {
  const [foo, set_foo] = useOutletContext();
  useEffect(() => {
    console.log(foo);
  }, []);
  return (
    <div className="contacts">
      <h1 className="title">Brian Tran</h1>

      <div className="profile_img">
        <img src={logo} alt="profile" />
      </div>

      <p className="bio">HELLO world</p>
    </div>
  );
};

export default Contact;
