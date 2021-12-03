import './CreateUser.scss';

const CreateUser = () => {
  return (
    <section className="page create-user navbar-margin">
      <div className="create-title">
        <h2>Create New User</h2>
      </div>
      <form className="create-new-user-form">
        <input type="text" placeholder="Username" className="create-inputs" />
        <input type="text" placeholder="Fullname" className="create-inputs" />
        <input type="email" placeholder="Email" className="create-inputs" />
        <input
          type="password"
          placeholder="Password"
          className="create-inputs"
        />
        <input type="phone" placeholder="Phone" className="create-inputs" />
        <input type="address" placeholder="Address" className="create-inputs" />
        <div className="gender">
          <label htmlFor="male">
            <input type="radio" name="gender" id="male" value="Male" />
            Male
          </label>
          <label htmlFor="female">
            {' '}
            <input type="radio" name="gender" id="female" value="Female" />
            Female
          </label>

          <label htmlFor="other">
            <input type="radio" name="gender" id="other" value="other" />
            Other
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </section>
  );
};

export default CreateUser;
