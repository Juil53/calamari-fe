import axios from "axios";
import { useState } from "react";

const Entitlement = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
  });

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await axios.post("http://localhost:3000/api/users", {
      body: user,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
  };

  return (
    <div>
      User Test
      <form onSubmit={handleSubmit} method="POST">
        <input type="text" name="firstName" value={user.firstName} onChange={handleChange} />
        <input type="text" name="lastName" value={user.lastName} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Entitlement;
