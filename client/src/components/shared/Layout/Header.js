import React from "react";
import { BiUserCircle, BiSolidLogOutCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  //logout handler
  const handlelogout = () => {
    localStorage.clear(); //clear the taken and data
    toast("Logout Successfully");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <div className="container-nav">
          <div>
            <img className="logo" src="\logo1.jpeg" alt="logo" />
          </div>
          <div className="navbar-brand">
            <i className="h3">Keshav Srushti Aayurvedic Research Center</i>
            <pre className="h5">Uttan, Mira Bhayandar, Maharashtra 400068</pre>
          </div>
          <ul className="navbar-nav">
            <li className="nav-item1">
              <p className="nav-link">
                <i>Welcome ! </i><br />
                <b className="h5">
                  <BiUserCircle /> {user?.name}
                </b>
              </p>
            </li>
            <li className="nav-item2">
              <button className="btn btn-danger" onClick={handlelogout}>
                Logout
                <BiSolidLogOutCircle className="mx-1" />
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
