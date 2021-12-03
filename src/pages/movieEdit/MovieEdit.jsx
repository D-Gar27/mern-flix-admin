import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import './MovieEdit.scss';
import storage from '../../firebase';

const MovieEdit = () => {
  const navigate = useNavigate();
  const { movieID } = useParams();
  const [fetched, setFetched] = useState(false);
  const [movie, setMovie] = useState({});
  const [isUploaded, setIsUploaded] = useState(0);
  const [files, setFiles] = useState({
    poster: null,
    titleImg: null,
    smallPoster: null,
  });
  const [preview, setPreview] = useState({
    poster: '',
    titleImg: '',
    smallPoster: '',
  });
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setFetched(false);
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/movies/find/${movieID}`
        );
        setMovie(res.data);
        setFetched(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovie();
  }, [movieID]);
  const handleUpload = (e) => {
    e.preventDefault();
    const filesToUpload = [
      { file: files.poster, label: 'poster' },
      { file: files.titleImg, label: 'titleImg' },
      { file: files.smallPoster, label: 'smallPoster' },
    ];
    filesToUpload.forEach((item) => {
      const uploadTask = storage.ref(`/images/${Date.now()}`).put(item.file);
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
            setMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
            setIsUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };
  const handleValues = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };
  const handleFiles = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFiles({ ...files, [e.target.name]: undefined });
      return;
    }
    const file = e.target.files[0];
    setFiles({ ...files, [e.target.name]: file });
  };
  useEffect(() => {
    if (!files.poster) {
      setPreview({ ...preview, poster: undefined });
      return;
    }

    const objectUrl = URL.createObjectURL(files.poster);
    setPreview({ ...preview, poster: objectUrl });
    return () => URL.revokeObjectURL(objectUrl);
  }, [files.poster, preview]);
  useEffect(() => {
    if (!files.titleImg) {
      setPreview({ ...preview, titleImg: undefined });
      return;
    }

    const objectUrl = URL.createObjectURL(files.titleImg);
    setPreview({ ...preview, titleImg: objectUrl });
    return () => URL.revokeObjectURL(objectUrl);
  }, [files.titleImg, preview]);
  useEffect(() => {
    if (!files.smallPoster) {
      setPreview({ ...preview, smallPoster: undefined });
      return;
    }

    const objectUrl = URL.createObjectURL(files.smallPoster);
    setPreview({ ...preview, smallPoster: objectUrl });
    return () => URL.revokeObjectURL(objectUrl);
  }, [files.smallPoster, preview]);
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/movies/${movieID}`,
        movie,
        {
          headers: {
            token: `Bearer ${JSON.parse(localStorage.getItem('av')).token}`,
          },
        }
      );
      navigate('/movies');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="page edit-movie navbar-margin">
      {fetched ? (
        <form className="edit-movie-container">
          <div className="text-input">
            <input
              type="text"
              value={movie.title}
              onChange={handleValues}
              name="title"
            />
            <textarea
              value={movie.desc}
              onChange={handleValues}
              name="desc"
            ></textarea>
            <input
              type="text"
              value={movie.trailer}
              onChange={handleValues}
              name="trailer"
            />
            <input
              type="text"
              value={movie.movie}
              onChange={handleValues}
              name="movie"
            />
            <input
              type="text"
              value={movie.duration}
              onChange={handleValues}
              name="duration"
            />
            <input
              type="text"
              value={movie.genre}
              onChange={handleValues}
              name="genre"
            />
            <input
              type="text"
              value={movie.releasedYear}
              onChange={handleValues}
              name="releasedYear"
            />
            <div className="radio">
              <label htmlFor="movie">
                <input
                  type="radio"
                  name="isSeries"
                  id="movie"
                  onChange={(e) => setMovie({ ...movie, isSeries: false })}
                />
                Movie
              </label>
              <label htmlFor="sirie">
                <input
                  type="radio"
                  name="isSeries"
                  id="serie"
                  onChange={(e) => setMovie({ ...movie, isSeries: true })}
                />
                Serie
              </label>
            </div>
          </div>
          <div className="file-input">
            <label htmlFor="hrz-poster">
              Horizontal Poster
              <img
                src={preview.poster || movie.poster}
                alt="horizontal-poster"
                className="hrz-poster"
              />
              <input
                type="file"
                id="hrz-poster"
                onChange={handleFiles}
                name="poster"
              />
            </label>
            <label htmlFor="title-img">
              Title png
              <img
                src={preview.titleImg || movie.titleImg}
                alt="title-png"
                className="title-img"
              />
              <input
                type="file"
                id="title-img"
                onChange={handleFiles}
                name="titleImg"
              />
            </label>
            <label htmlFor="poster">
              Poster
              <img
                src={preview.smallPoster || movie.smallPoster}
                alt="poster"
                className="poster"
              />
              <input
                type="file"
                id="poster"
                onChange={handleFiles}
                name="smallPoster"
              />
            </label>
            {isUploaded === 3 ? (
              <button type="submit" onClick={handleUpdate}>
                Edit
              </button>
            ) : (
              <button onClick={handleUpload}>Upload</button>
            )}
          </div>
        </form>
      ) : (
        <h1 className="loading">Loading ...</h1>
      )}
    </section>
  );
};

export default MovieEdit;
