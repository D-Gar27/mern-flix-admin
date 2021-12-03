import './User.scss';
import {
  CalendarToday,
  Email,
  LocationCity,
  Person,
  Phone,
} from '@material-ui/icons';

const User = () => {
  return (
    <section className="page user navbar-margin">
      <div className="user-container">
        <div className="user-info-container">
          <div className="user-info">
            <div className="user">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPyGNr2qL63Sfugk2Z1-KBEwMGOfycBribew&usqp=CAU"
                alt="user profile"
              />
              <div>
                <h4>Mont Sein Lar</h4>
                <p>QA engineer</p>
              </div>
            </div>
            <div className="user-details">
              <p>
                <Person />
                msl69
              </p>
              <p>
                <CalendarToday />
                23-5-1995
              </p>
              <p>
                <Email />
                msl@gmail.com
              </p>
              <p>
                <Phone />
                +95938920435
              </p>
              <p>
                <LocationCity />
                Yangon, Myanmar
              </p>
            </div>
          </div>
          <div className="edit-user">
            <form>
              <div className="input">
                <input type="text" placeholder="Mont Sein Lar" />
                <input type="text" placeholder="msl69" />
                <input type="email" placeholder="msl@gmail.com" />
                <input type="text" placeholder="+95938920435" />
                <input type="text" placeholder="Yangon, Myanmar" />
              </div>
              <div className="profile">
                <label htmlFor="profile-pic">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPyGNr2qL63Sfugk2Z1-KBEwMGOfycBribew&usqp=CAU"
                    alt="user profile"
                  />
                </label>
                <input
                  type="file"
                  name="profile-pic"
                  id="profile-pic"
                  style={{ display: 'none' }}
                />
                <button type="submit">Edit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default User;
