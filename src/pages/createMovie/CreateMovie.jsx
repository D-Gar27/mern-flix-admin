import axios from 'axios';
import { useState } from 'react';
import storage from '../../firebase.js';
import './CreateMovie.scss';
import { useNavigate } from 'react-router';

const CreateMovie = () => {
  const navigate = useNavigate();
  const [textValues, setTextValues] = useState({
    title: '',
    desc: '',
    trailer: '',
    movie: '',
    duration: '',
    genre: '',
    releasedYear: '',
    isSeries: false,
  });
  const [files, setFiles] = useState({
    poster: null,
    titleImg: null,
    smallPoster: null,
  });
  const [isUploaded, setIsUploaded] = useState(0);
  const handleTextValue = (e) => {
    const value = e.target.value;
    setTextValues({ ...textValues, [e.target.name]: value });
  };
  const handleUpload = (e) => {
    e.preventDefault();
    const filesToUpload = [
      { file: files.poster, label: 'poster' },
      { file: files.titleImg, label: 'titleImg' },
      { file: files.smallPoster, label: 'smallPoster' },
    ];
    filesToUpload.forEach((item) => {
      const uploadTask = storage
        .ref(`/images/${item.file.name + Date.now()}`)
        .put(item.file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`${progress}% is done`);
        },
        (err) => console.log(err),
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setTextValues((prev) => {
              return { ...prev, [item.label]: url };
            });
            setIsUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/movies`, textValues, {
        headers: {
          token: `Bearer ${localStorage.getItem('av')}`,
        },
      });
      navigate('/movies');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="page create-movie navbar-margin">
      <form className="edit-movie-container">
        <div className="text-input">
          <input
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleTextValue}
          />
          <textarea
            placeholder="Synopsis"
            name="desc"
            onChange={handleTextValue}
          ></textarea>
          <input
            type="text"
            placeholder="Trailer Code"
            name="trailer"
            onChange={handleTextValue}
          />
          <input
            type="text"
            placeholder="Movie"
            name="movie"
            onChange={handleTextValue}
          />
          <input
            type="text"
            placeholder="Duration"
            name="duration"
            onChange={handleTextValue}
          />
          <input
            type="text"
            placeholder="Genre"
            name="genre"
            onChange={handleTextValue}
          />
          <input
            type="text"
            placeholder="Year"
            name="releasedYear"
            onChange={handleTextValue}
          />

          <div className="radio">
            <label htmlFor="movie">
              <input
                type="radio"
                name="type"
                id="movie"
                value="false"
                onChange={(e) =>
                  setTextValues({ ...textValues, isSeries: false })
                }
              />
              Movie
            </label>
            <label htmlFor="sirie">
              <input
                type="radio"
                name="type"
                id="serie"
                value="true"
                onChange={(e) =>
                  setTextValues({ ...textValues, isSeries: true })
                }
              />
              Serie
            </label>
          </div>
        </div>

        <div className="file-input">
          <label htmlFor="hrz-poster">
            <input
              type="file"
              id="hrz-poster"
              onChange={(e) => {
                setFiles({ ...files, poster: e.target.files[0] });
              }}
            />
            Horizontal Poster
          </label>

          <label htmlFor="title-img">
            <input
              type="file"
              id="hrz-poster"
              onChange={(e) => {
                setFiles({ ...files, titleImg: e.target.files[0] });
              }}
            />
            Title png
          </label>

          <label htmlFor="hrz-poster">
            <input
              type="file"
              id="hrz-poster"
              onChange={(e) => {
                setFiles({ ...files, smallPoster: e.target.files[0] });
              }}
            />
            Poster
          </label>
          {isUploaded === 3 ? (
            <button type="submit" onClick={handleSubmit}>
              Create
            </button>
          ) : (
            <button onClick={handleUpload}>Upload</button>
          )}
        </div>
      </form>
    </section>
  );
};

export default CreateMovie;
