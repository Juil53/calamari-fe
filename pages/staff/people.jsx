import axios from "axios";
import styles from "../../styles/People.module.scss";
import moment from "moment";

export const getStaticProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users`);
  const userList = res.data;

  return {
    props: { userList },
    revalidate: 10,
  };
};

const Users = ({ userList }) => {
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
              <td>
                <img src={user.avatar ? user.avatar : "/imgs/default_avatar.jpg"} alt="avatar" />
              </td>
              <td>{user.fullName}</td>
              <td>
                {user.role === "admin" ? (
                  <span style={{ color: "crimson" }}>{user.role}</span>
                ) : (
                  user.role
                )}
              </td>
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
