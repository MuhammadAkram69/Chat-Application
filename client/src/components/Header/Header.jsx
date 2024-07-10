
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { IoNotificationsSharp, IoChatboxEllipsesOutline, } from "react-icons/io5";
import { MdArrowDropDown } from "react-icons/md";
import { BiChevronRight } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addUserData, removeUserData } from "../../Store/Slices/userSlice";
import "./Header.scss";
const baseUrl = process.env.REACT_APP_BASE_URL;


const Header = () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const profilehandler = () => {
    navigate("/profile");
  };
  const logoutHandler = () => {
    console.log("logig Out");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    dispatch(removeUserData());
    navigate("/");
  };



  const toggleDropdown = (check) => {
    setIsDropdownOpen(check);
  };
  return (
    <Box className="Header">
      <h3 className="title" onClick={() => navigate("/")}>
        Chat App
      </h3>
      <Box className="header-profile">
        <Box
          className="settings"
        >
          {token ? (
            <>
              <span className="chat-icon" onClick={() => navigate("/")}>
                <IoChatboxEllipsesOutline size={30} />
              </span>
              <Box className="accounts"
                onClick={() => toggleDropdown(!isDropdownOpen)}
              >
                <p>Account</p>
                <MdArrowDropDown size={25} />
                {isDropdownOpen && (
                  <Box
                    className="dropdown-content"
                    onMouseLeave={() => toggleDropdown(false)}
                  >
                    <Box className="each-option" onClick={() => profilehandler()}>
                      <p >Profile</p>
                      <BiChevronRight size={25} />
                    </Box>
                    <Box className="each-option">
                      <p>Settings</p>
                      <BiChevronRight size={25} />
                    </Box>
                    <Box className="each-option" onClick={() => logoutHandler()}>
                      <p >Log out</p>
                      <BiChevronRight size={25} />
                    </Box>
                  </Box>
                )}

              </Box>
              <p>{username}</p>

            </>
          ) : (
            <>
              <p onClick={() => navigate("/signup")}>Signup</p>
              <p onClick={() => navigate("/signin")}>Signin</p>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
