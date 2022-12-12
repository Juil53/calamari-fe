export const getStaticPaths = async () => {
  const response = await fetch("https://633d07937e19b17829061bcf.mockapi.io/calendar/flow");
  const events = await response.json();

  return {
    paths: events.map((event) => ({ params: { requestId: event.id } })),
    fallback:true,
  };
};

export const getStaticProps = async ({ params }) => {
  const response = await fetch(
    `https://633d07937e19b17829061bcf.mockapi.io/calendar/flow/${params.requestId}`
  );
  const request = await response.json();

  return {
    props: {
      request,
    },
    revalidate: 10,
  };
};

const FlowDetail = () => {
  return ( 
    <div>
      FlowDetail
    </div>
   );
}
 
export default FlowDetail;