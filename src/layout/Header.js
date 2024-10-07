import {useNavigate} from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <header className="header">
      <h1
        className="logo cursor"
        onClick={() => {
          navigate("/");
        }}
      >
        Review<span>&RATE</span>
      </h1>
      <div className="header-right">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Signup</button>
      </div>
    </header>
  );
}
export default Header;
