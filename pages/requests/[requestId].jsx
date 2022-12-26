import { useRouter } from "next/router";
import Loading from "../../components/Loading";

const RequestDetail = ({ request }) => {
  const router = useRouter();

  // test Case fallback true
  if (router.isFallback) {
    return <Loading />;
  }

  if (!request) return null;
  if (router.isFallback) return <h1>Loading...</h1>;

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
  // console.log(events)

  return {
    paths: events.map((event) => ({ params: { requestId: event.id } })),
    // fallback: false, // can also be true or 'blocking'
    // fallback:blocking,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const response = await fetch(
    `https://633d07937e19b17829061bcf.mockapi.io/calendar/events/${params.requestId}`
  );
  const request = await response.json();

  return {
    props: {
      request,
    },
    revalidate: 10,
  };
};
