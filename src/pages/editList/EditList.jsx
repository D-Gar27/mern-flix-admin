import '../createList/CreateList.scss';
import { AddCircleOutline, Close } from '@material-ui/icons';
import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { MoviesContext } from '../../context/moviecontext/MoviesContext.js';
import { useParams } from 'react-router';

const EditList = () => {
  const { movies } = useContext(MoviesContext);
  const { listID } = useParams();
  console.log(listID);
  const [values, setValues] = useState({});
  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/lists/${listID}`,
          {
            headers: {
              token: `Bearer ${JSON.parse(localStorage.getItem('av')).token}`,
            },
          }
        );
        console.log(res.data);
        setValues(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchList();
  }, [listID]);
  console.log(values);
  const [list, setList] = useState([]);
  const [created, setCreated] = useState(false);
  const [selected, setSelected] = useState([]);
  const addToSelected = (id, title) => {
    if (selected.length < 10 && !selected.includes(title)) {
      setSelected([...selected, title]);
      setList([...list, id]);
    }
  };
  const removeFromList = (title) => {
    const index = selected.indexOf(title);
    const removedSelected = selected.filter((movie) => movie !== title);
    const removedList = list.filter((id, i) => i !== index);
    setSelected(removedSelected);
    setList(removedList);
  };
  const handleCreate = async (e) => {
    e.preventDefault();
    setCreated(false);
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/lists`,
        { ...values, list: list },
        {
          headers: {
            token: `Bearer ${JSON.parse(localStorage.getItem('av')).token}`,
          },
        }
      );
      setCreated(true);
      window.location.assign('/movies-lists');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="page create-list navbar-margin">
      <form className="create-list-container">
        <div className="to-create">
          <input
            type="text"
            placeholder="Title"
            value={values.title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
          />
          <select
            name="type"
            id="type"
            value={values.type}
            onChange={(e) => setValues({ ...values, type: e.target.value })}
          >
            <option disabled>Type</option>
            <option value="movie">Movie</option>
            <option value="serie">Serie</option>
          </select>

          <select
            name="genre"
            id="genre"
            value={values.genre}
            onChange={(e) => setValues({ ...values, genre: e.target.value })}
          >
            <option disabled>Genre</option>
            <option value="action">Action</option>
            <option value="comedy">Comedy</option>
            <option value="horror">Horror</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="fantasy">Fantasy</option>
          </select>
          <div className="list-to-create">
            <h3>Movies in list</h3>
            <div className="selected-movies">
              {selected.map((title, i) => {
                return (
                  <p key={i}>
                    {title}
                    <Close
                      style={{ color: 'red', cursor: 'pointer' }}
                      onClick={() => removeFromList(title)}
                    />
                  </p>
                );
              })}
            </div>
          </div>
        </div>
        {selected.length === 10 && (
          <button
            className={created ? 'finished upload-btn' : 'upload-btn'}
            onClick={handleCreate}
          >
            Upload
          </button>
        )}
        <div className="movies-list">
          {movies.map((movie) => {
            const { _id, title, poster } = movie;
            return (
              <div className="to-add" key={_id}>
                <img src={poster} alt="a" />
                <p>{title}</p>
                <AddCircleOutline onClick={() => addToSelected(_id, title)} />
              </div>
            );
          })}
        </div>
      </form>
    </section>
  );
};

export default EditList;
