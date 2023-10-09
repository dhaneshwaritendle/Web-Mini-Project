import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProfileContext from '../../store/ProfileContext';

function Sidebar() {
  const ctx = useContext(ProfileContext);
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link to="/evaluator" className="nav-link">
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        {
          ctx.isProfileCreated && (
            <>
            <li className="nav-item">
              <Link to="" className="nav-link">
                <i className="bi bi-grid"></i>
                <span>Some Option</span>
              </Link>
            </li>
            </>
          )
        }
      </ul>
    </aside>
  );
}

export default Sidebar;
