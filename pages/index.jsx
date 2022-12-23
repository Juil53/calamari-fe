const Dashboard = () => {
  return (
    <>
      <h2>Homepage Leave app</h2>
    </>
  );
};

export default Dashboard;

Dashboard.getLayout = function PageLayout(page) {
  return <>{page}</>;
};