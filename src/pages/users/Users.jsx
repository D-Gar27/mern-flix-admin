import './Users.scss';

import { DataGrid } from '@material-ui/data-grid';
import { Delete } from '@material-ui/icons';
// import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/users`, {
          headers: {
            token: `Bearer ${JSON.parse(localStorage.getItem('av')).token}`,
          },
        });
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);
  const handleDel = (id) => {
    const afterDel = data.filter((user) => user.id !== id);
    setData(afterDel);
  };
  const columns = [
    { field: '_id', headerName: 'ID', width: 250 },
    {
      field: 'username',
      headerName: 'User',
      width: 250,
      renderCell: (params) => {
        return (
          <div className="user-list">
            <img src={params.row.profilePic} alt="avatar" />
            <p>{params.row.username}</p>
          </div>
        );
      },
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
      editable: true,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 250,
      renderCell: (params) => {
        return (
          <div className="action-btns">
            {/* <button>
              <Link to={'/users/' + params.row._id}>
                <Edit style={{ color: 'cyan' }} />
              </Link>
            </button> */}
            <button onClick={() => handleDel(params.row._id)}>
              <Delete style={{ color: 'red' }} />
            </button>
          </div>
        );
      },
    },
  ];
  return (
    <section className="navbar-margin users page">
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={9}
        checkboxSelection
        disableSelectionOnClick
        className="grid"
        rowsPerPageOptions={[9]}
        getRowId={(r) => r._id}
      />
    </section>
  );
};

export default Users;
