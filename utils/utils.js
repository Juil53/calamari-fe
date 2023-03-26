import axios from "axios";

export const handleStatus = (type) => {
  switch (type) {
    case 0:
      return <span style={{ color: 'purple', backgroundColor: '#d7d7f7', padding: '5px', borderRadius: '4px', border: '1px solid purple', width: '100%' }}>Pending</span>;
    case 1:
      return <span style={{ color: 'green', backgroundColor: '#9cf3ca', padding: '5px', borderRadius: '4px', border: '1px solid green' }}>Approved</span>;
    case 2:
      return <span style={{ color: 'crimson', backgroundColor: '#fbcbc8', padding: '5px', borderRadius: '4px', border: '1px solid crimson' }}>Denied</span>;
    default:
      break;
  }
};

export const fetchUser = async (email, password) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users`)
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

export const handleConvertNumber = (number) => {
  switch (number) {
    case 1:
      return "One"
    case 2:
      return "Two"
    case 3:
      return "Three"
    default:
      break;
  }
}