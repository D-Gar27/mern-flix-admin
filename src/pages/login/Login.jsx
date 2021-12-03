import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authcontext/AuthContext.js';
import { loginCall } from '../../context/fetch/fetch.js';
import './Login.scss';

const Login = () => {
  const { fetching, dispatch, user } = useContext(AuthContext);
  const [values, setValues] = useState({
    auth: '',
    password: '',
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    loginCall(values, dispatch);
  };
  useEffect(() => {
    if (user) {
      window.location.assign('/');
    }
  }, [user]);
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
