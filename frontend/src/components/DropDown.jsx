import React, { useState } from "react";
import { MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="menu-container">
      <button onClick={toggleMenu} className="menu-icon">
        <MdMenu size="30px" />
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <ul>
            <li>
              <Link to="/" className="menu-item">Home</Link>
            </li>
            <li>
              <Link to="/login" className="menu-item">Login</Link>
            </li>
            <li>
              <Link to="/about" className="menu-item">About</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
