import axios from "axios";

export const handleStatus = (type) => {
  switch (type) {
    case 0:
      return <span style={{ color: 'orange', backgroundColor:'#ffffcc',padding:'5px',borderRadius:'4px', width:'100%' }}>Pending</span>;
    case 1:
      return <span style={{ color: 'green',backgroundColor:'#9cf3ca',padding:'5px',borderRadius:'4px' }}>Approved</span>;
    case 2:
      return <span style={{ color: 'crimson',backgroundColor:'#fbcbc8',padding:'5px',borderRadius:'4px' }}>Denied</span>;
    default:
      break;
  }
};

export const fetchUser = async (email, password) => {
  try {
    // const res = await axios.get("https://633d07937e19b17829061bcf.mockapi.io/calendar/users")
    const res = await axios.get(`${process.env.API_ENDPOINT}/users`)
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
