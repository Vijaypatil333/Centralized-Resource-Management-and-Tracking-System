import React from "react";
import { userMenu } from "./Menus/userMenu";
import { useLocation, Link } from "react-router-dom";
import "../../../style/Layout.css";

const Sidebar = () => {
  const loaction = useLocation();
  return (
    <div>
      <div className="sidebar">
        <div className="menu">
          {userMenu.map((menu) => {
            const isActive = loaction.pathname === menu.path;
            return (
              <div
                className={`menu-item ${isActive && "active"}`}
                key={menu.name}
              >
                <i className={menu.icon}></i>
                <Link to={menu.path}>{menu.name}</Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
