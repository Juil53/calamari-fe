export const handleStatus = (type) => {
  switch (type) {
    case 0:
      return <span>Pending</span>;
    case 1:
      return <span>Approved</span>;
    case 2:
      return <span>Denied</span>;
    default:
      break;
  }
};
