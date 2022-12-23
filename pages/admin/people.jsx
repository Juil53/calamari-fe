import axios from "axios";
import * as Constant from "../../constant/constants";
import styles from "../../styles/People.module.scss";
import moment from 'moment'

export const getStaticProps = async () => {
  const res = await axios({
    url: Constant.usersAPI,
    // url: "https://dvhnghia-backend.herokuapp.com",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "",
    },
  });
  const userList = res.data;

  return {
    props: { userList },
    revalidate: 10,
  };
};

const Users = ({ userList }) => {
  console.log(userList)
  return (
    <div className={styles.wrapper}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>Full Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {userList?.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td><img src={user.avatar} alt="avatar" /></td>
              <td>{user.fullName}</td>
              <td>{user.role}</td>
              <td>{user.email}</td>
              <td>{moment(user.createdAt).format("yyyy-MM-DD")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
