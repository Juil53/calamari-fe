import axios from "axios";
import styles from "../../../styles/People.module.scss";
import moment from "moment";
import Link from "next/link";

export const getStaticProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users`);
  const users = res.data;

  return {
    props: { users },
    revalidate: 10,
  };
};

const Users = ({ users }) => {
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
          {users?.map((user) => (
            <Link key={user._id} href={`/admin/staff/${user._id}`}>
              <tr>
                <td>{user._id}</td>
                <td>
                  <img src={user.image ? user.image : "/imgs/default_avatar.jpg"} alt="avatar" />
                </td>
                <td>{user.full_name}</td>
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
            </Link>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
