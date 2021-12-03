import { useState, useEffect } from 'react';
import './Members.scss';
import axios from 'axios';

const Members = () => {
  const [users, setUsers] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      setIsFetched(false);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/users?new=true`,
          {
            headers: {
              token: `Bearer ${localStorage.getItem('av')}`,
            },
          }
        );
        setUsers(res.data);
        setIsFetched(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div className="members">
      <h4>New Members</h4>
      <div className="new-users">
        {isFetched ? (
          <>
            {users.map((user) => {
              const { profilePic, username, email, _id } = user;
              return (
                <div className="new-user" key={_id}>
                  <img src={profilePic} alt="user-profile" />
                  <div className="user-info">
                    <h5>{username}</h5>
                    <p>{email}</p>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default Members;
