const loginStart = () => ({ type: 'LOGIN_START' });
const loginSuccess = (user) => ({ type: 'LOGIN_SUCCESS', payload: user });
const loginFail = () => ({ type: 'LOGIN_FAIL' });
const logOut = () => ({ type: 'LOG_OUT' });

export { loginFail, loginStart, loginSuccess, logOut };
