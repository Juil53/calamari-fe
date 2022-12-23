function Logout() {
  return (
    <div>Logout</div>
  )
}

export default Logout

Logout.getLayout = function PageLayout(page) {
  return <>{page}</>;
};