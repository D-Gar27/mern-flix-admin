import axios from 'axios';
import { loginFail, loginSuccess } from '../authcontext/AuthActions.js';

const loginCall = async (user, dispatch) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      user
    );
    if (res.data.admin) {
      dispatch(loginSuccess(res.data));
    } else {
      dispatch(loginFail());
    }
  } catch (error) {
    dispatch(loginFail());
  }
};

export { loginCall };
