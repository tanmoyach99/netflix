import React, { useState } from "react";
import "./Navbar.scss";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  // console.log(isScrolled);
  return (
    <div className={isScrolled ? "navBar scrolled" : "navBar"}>
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt=""
          />
          <Link to="/" className="link">
            <span>Homepage</span>
          </Link>
          <Link to="/series" className="link">
            <span>Series</span>
          </Link>
          <Link to="/movies" className="link">
            <span>Movies</span>
          </Link>
          <Link to="/newAndPopular" className="link">
            <span>New and Popular</span>
          </Link>
          <Link to="/myList" className="link">
            <span>My List</span>
          </Link>

          {/* <span>Series</span>
          <span>Movies</span>
          <span>New and Popular</span>
          <span>My List</span> */}
        </div>
        <div className="right">
          <SearchIcon className="icon" />
          <span>Kid</span>
          <NotificationsIcon className="icon" />
          <img
            src="	https://i.ibb.co/f0kK5w2/IMG-20201121-232938-removebg-preview.png"
            alt=""
          />
          <div className="profile">
            <ArrowDropDownIcon className="icon" />
            <div className="options">
              <span>logout</span>
              <span>settings</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
