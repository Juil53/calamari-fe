import axios from "axios";

const Users = ({ userList }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Role</th>
            <th>Image</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead> 
        <tbody>
          {userList?.map((user) => (
            <tr key={user.id}>
              <td>{user.fullName}</td>
              <td>{user.role}</td>
              <td>
                <img src={user.image} alt="avatar" width={50} height={50}/>
              </td>
              <td>{user.email}</td>
              <td>{user.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

export const getStaticProps = async () => {
  const res = await axios({
    url: "http://localhost:3000/api/users",
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        // "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsIm15VXNlckVtYWlsIjoiaG9hbmdAZ21haWwuY29tIiwiaWF0IjoxNjY4MTQ4NTI1LCJleHAiOjE2NjgxNTIxMjV9.92PdZ05ERf4F20zgn8EpzMq0Nxy9zpDGFewPly4BRWI"
    },
});
  const userList = res.data;

  return {
    props: { userList },
    revalidate: 1,
  };
};
