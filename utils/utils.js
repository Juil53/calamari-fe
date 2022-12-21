import axios from "axios";

export const handleStatus = (type) => {
  switch (type) {
    case 0:
      return <span style={{ color: 'orange', fontWeight: 'bold' }}>Pending</span>;
    case 1:
      return <span style={{ color: 'green', fontWeight: 'bold' }}>Approved</span>;
    case 2:
      return <span style={{ color: 'red', fontWeight: 'bold' }}>Denied</span>;
    default:
      break;
  }
};

export const fetchUser = async (email, password) => {
  try {
    const res = await axios.get("https://633d07937e19b17829061bcf.mockapi.io/calendar/users")
    const users = res.data
    const user = users.find(user => user.email === email && user.password === password)
    if (user) {
      return user
    }
    return null
  } catch (error) {
    throw new Error("Something wrong!")
  }
}
