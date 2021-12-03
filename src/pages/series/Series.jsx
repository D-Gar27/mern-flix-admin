import './Series.scss';

import { DataGrid } from '@material-ui/data-grid';
import { Delete, Edit } from '@material-ui/icons';

import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { MoviesContext } from '../../context/moviecontext/MoviesContext';
import axios from 'axios';

const Series = () => {
  const { dispatch, movies: data } = useContext(MoviesContext);
  const handleDel = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/movies/${id}`, {
        headers: {
          token: `Bearer ${localStorage.getItem('av')}`,
        },
      });
      dispatch({ type: 'DELETE_MOVIE', payload: id });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchMovies = async () => {
      dispatch({ type: 'MOVIES_START' });
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/movies`, {
          headers: {
            token: `Bearer ${JSON.parse(localStorage.getItem('av')).token}`,
          },
        });
        const series = res.data.filter((movie) => movie.isSeries === true);
        dispatch({ type: 'MOVIES_SUCCESS', payload: series });
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, [dispatch]);
  const columns = [
    { field: '_id', headerName: 'ID', width: 250 },
    {
      field: 'movie',
      headerName: 'Movie',
      width: 400,
      renderCell: (params) => {
        return (
          <div className="user-list">
            <img src={params.row.poster} alt="poster" />
            <p>{params.row.title}</p>
          </div>
        );
      },
    },
    {
      field: 'duration',
      headerName: 'Duration',
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
              <Link to={'/movies/' + params.row._id}>
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
      <DataGrid
        rows={data}
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

export default Series;
