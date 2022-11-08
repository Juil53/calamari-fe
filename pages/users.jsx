import axios from "axios";
import { useState } from "react";

const Users = ({ userList }) => {

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
    const res = await axios({
      url: "/api/users",
      method: "POST",
      data: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>FirstName</th>
            <th>LastName</th>
          </tr>
        </thead>
        <tbody>
          {userList?.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form */}
      <form onSubmit={handleSubmit} method="POST">
        <input type="text" name="firstName" value={user.firstName} onChange={handleChange} />
        <input type="text" name="lastName" value={user.lastName} onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Users;

export const getStaticProps = async () => {
  const res = await axios.get("http://localhost:3000/api/users");
  const userList = res.data;
  console.log(userList);

  return {
    props: { userList },
    revalidate: 1,
  };
};
