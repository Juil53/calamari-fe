export const handleStatus = (type) => {
  switch (type) {
    case 0:
      return <span style={{color:'orange',fontWeight:'bold'}}>Pending</span>;
    case 1:
      return <span style={{color:'green',fontWeight:'bold'}}>Approved</span>;
    case 2:
      return <span style={{color:'red',fontWeight:'bold'}}>Denied</span>;
    default:
      break;
  }
};
