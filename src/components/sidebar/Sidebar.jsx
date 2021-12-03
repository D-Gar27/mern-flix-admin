import './Sidebar.scss';
import {
  AccountCircle,
  BusinessCenter,
  Email,
  Feedback,
  Group,
  Home,
  Movie,
  Report,
  Timeline,
  TrendingUp,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="side-bar">
      <div className="sidebar-container">
        <div className="sidebar-menu">
          <h4 className="menu-name">Dashboard</h4>
          <ul className="menu-options">
            <li>
              <Link to="/" className="sidebar-link">
                <Home />
                Home
              </Link>
            </li>
            <li>
              <Timeline />
              Analytics
            </li>
            <li>
              <TrendingUp />
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebar-menu">
          <h4 className="menu-name">Database</h4>
          <ul className="menu-options">
            <li>
              <Link to="/users" className="sidebar-link">
                <Group />
                Users
              </Link>
            </li>
            <li>
              <Link to="/movies" className="sidebar-link">
                <Movie />
                Movies
              </Link>
            </li>
            <li>
              <Link to="/series" className="sidebar-link">
                <Movie />
                Series
              </Link>
            </li>
            <li>
              <Link to="/movies-lists" className="sidebar-link">
                <Movie />
                Movies Lists
              </Link>
            </li>
          </ul>
        </div>
        <div className="sidebar-menu">
          <h4 className="menu-name">Notifications</h4>
          <ul className="menu-options">
            <li>
              <Email />
              Main
            </li>
            <li>
              <Feedback />
              Feedback
            </li>
            <li>
              <Report />
              Report
            </li>
          </ul>
        </div>
        <div className="sidebar-menu">
          <h4 className="menu-name">Staff</h4>
          <ul className="menu-options">
            <li>
              <BusinessCenter />
              Manage
            </li>
            <li>
              <AccountCircle />
              Profile Setting
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
