import '../movies/Movies.scss';

import { DataGrid } from '@material-ui/data-grid';
import { Delete, Edit } from '@material-ui/icons';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Lists = () => {
  const [lists, setLists] = useState([]);
  const handleDel = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/movies/${id}`, {
        headers: {
          token: `Bearer ${JSON.parse(localStorage.getItem('av')).token}`,
        },
      });
      // dispatch({ type: 'DELETE_MOVIE', payload: id });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchMovies = async () => {
      // dispatch({ type: 'MOVIES_START' });
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/lists`, {
          headers: {
            token: `Bearer ${JSON.parse(localStorage.getItem('av')).token}`,
          },
        });
        setLists(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, []);
  const columns = [
    { field: '_id', headerName: 'ID', width: 250 },
    {
      field: 'title',
      headerName: 'Movies',
      width: 450,
    },
    {
      field: 'type',
      headerName: 'Title',
      width: 150,
      editable: true,
    },
    {
      field: 'genre',
      headerName: 'Genre',
      type: 'number',
      width: 120,
      editable: true,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="action-btns">
            <button>
              <Link to={'/movies-lists/' + params.row._id}>
                <Edit style={{ color: 'cyan' }} />
              </Link>
            </button>
            <button onClick={() => handleDel(params.row._id)}>
              <Delete style={{ color: 'red' }} />
            </button>
          </div>
        );
      },
    },
  ];
  return (
    <section className="page navbar-margin movies">
      <button className="create">
        <Link
          to="/movies-lists/create"
          style={{ textDecoration: 'none', color: 'white' }}
        >
          Create New
        </Link>
      </button>
      <DataGrid
        rows={lists}
        columns={columns}
        rowsPerPageOptions={[9]}
        pageSize={9}
        checkboxSelection
        disableSelectionOnClick
        className="grid"
        getRowId={(r) => r._id}
      />
    </section>
  );
};

export default Lists;
