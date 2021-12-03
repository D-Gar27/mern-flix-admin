import './app.scss';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import Home from './pages/home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router';
import Users from './pages/users/Users';
import User from './pages/user/User';
import CreateUser from './pages/createUser/CreateUser';
import Movies from './pages/movies/Movies';
import React, { useContext } from 'react';
import Login from './pages/login/Login';
import { AuthContext } from './context/authcontext/AuthContext';
import MovieEdit from './pages/movieEdit/MovieEdit';
import CreateMovie from './pages/createMovie/CreateMovie';
import Series from './pages/series/Series';
import Lists from './pages/lists/Lists';
import CreateList from './pages/createList/CreateList';
import EditList from './pages/editList/EditList';

function App() {
  const { user } = useContext(AuthContext);
  // useEffect(() => {
  //   const fetchStats = async () => {
  //     try {
  //       const res = await axios.get(
  //         `${process.env.REACT_APP_API_URL}/users/stats`,
  //         {
  //           headers: {
  //             token:
  //               'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MWExY2NlMzE3M2ZiNWEwNjI4NWRiOGIiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjM4MTY2MzkyLCJleHAiOjE2Mzg3NzExOTJ9.vF81ULNIeKWxAEdAQdjMm6nyAPS3gpLq-yJGQRYV_eA',
  //           },
  //         }
  //       );
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchStats();
  // }, []);
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="side-bar-and-others">
          <Sidebar />
          <Routes>
            <Route
              exact
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              exact
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              exact
              path="/users"
              element={user ? <Users /> : <Navigate to="/login" />}
            />
            <Route
              exact
              path="/users/:userID"
              element={user ? <User /> : <Navigate to="/login" />}
            />
            <Route exact path="/newUser" element={<CreateUser />} />
            <Route
              exact
              path="/movies"
              element={user ? <Movies /> : <Navigate to="/login" />}
            />
            <Route
              exact
              path="/movies/create"
              element={user ? <CreateMovie /> : <Navigate to="/login" />}
            />
            <Route
              exact
              path="/movies/:movieID"
              element={user ? <MovieEdit /> : <Navigate to="/login" />}
            />
            <Route
              exact
              path="/series"
              element={user ? <Series /> : <Navigate to="/login" />}
            />
            <Route
              exact
              path="/movies-lists"
              element={user ? <Lists /> : <Navigate to="/login" />}
            />
            <Route
              exact
              path="/movies-lists/create"
              element={user ? <CreateList /> : <Navigate to="/login" />}
            />
            <Route
              exact
              path="/movies-lists/:listID"
              element={user ? <EditList /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
