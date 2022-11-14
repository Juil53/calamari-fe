import axios from "axios";
import * as Constant from "../constant/constants"
import styles from "../styles/People.module.scss"

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
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                    {userList?.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>
                                <img src={user.avatar} alt="avatar" width={30} height={30}/>
                            </td>
                            <td>{user.fullName}</td>
                            <td>{user.role}</td>
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

export const getServerSideProps = async () => {
    const res = await axios({
        url: Constant.usersAPI,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const userList = res.data;

    return {
        props: { userList },
    };
};
