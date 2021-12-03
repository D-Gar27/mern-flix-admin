import './Navbar.scss';
import { Notifications, Language, Settings } from '@material-ui/icons';

const Navbar = () => {
  return (
    <nav className="nav-bar">
      <h2 className="logo">MERN FLIX ADMIN</h2>
      <div className="admin-profile">
        <div className="icon noti">
          <Notifications />
          <span>2</span>
        </div>
        <div className="icon language">
          <Language />
          <span>1</span>
        </div>
        <div className="icon settings">
          <Settings />
        </div>
        <img
          src="https://www.nicepng.com/png/full/182-1829287_cammy-lin-ux-designer-circle-picture-profile-girl.png"
          alt="profile"
          className="admin-photo"
        />
      </div>
    </nav>
  );
};

export default Navbar;
