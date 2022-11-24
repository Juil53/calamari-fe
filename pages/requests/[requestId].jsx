import axios from "axios";
import * as Constant from "../../constant/constants";

const RequestDetail = ({ request }) => {
  if (!request) return null;

  return (
    <div>
      <h1>Request: {request.id}</h1>
    </div>
  );
};

export default RequestDetail;

export const getStaticPaths = async () => {
  const response = await fetch("https://633d07937e19b17829061bcf.mockapi.io/calendar/events");
  const events = await response.json();

  return {
    paths: events.map((event) => ({ params: { requestId: event.id } })),
    fallback: false, // can also be true or 'blocking'
  };
};

export const getStaticProps = async ({ params }) => {
  const response = await fetch(`https://633d07937e19b17829061bcf.mockapi.io/calendar/events/${params.requestId}`);
  const request = await response.json();

  return {
    props: {
      request,
    },
  };
};
