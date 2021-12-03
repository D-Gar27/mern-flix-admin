import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authcontext/AuthContext.js';
// import { loginCall } from '../../context/fetch/fetch.js';
import './Login.scss';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate();
  const { fetching, dispatch, user } = useContext(AuthContext);
  const [values, setValues] = useState({
    auth: '',
    password: '',
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        values
      );
      if (res.data.admin) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      } else {
        dispatch({ type: 'LOGIN_FAIL' });
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAIL' });
    }
  };
  useEffect(() => {
    if (user) {
      localStorage.setItem('av', JSON.stringify(user.token));
      navigate('/');
    }
  }, [user, navigate]);
  return (
    <section className="auth">
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email or Username"
          value={values.auth}
          onChange={(e) => setValues({ ...values, auth: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={(e) => setValues({ ...values, password: e.target.value })}
        />
        {fetching ? (
          <button type="submit" disabled>
            Login
          </button>
        ) : (
          <button type="submit">Login</button>
        )}
      </form>
    </section>
  );
};

export default Login;
