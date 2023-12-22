import "./contacts.css";
import logo from "../logo.svg";

const Contact = () => {
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
