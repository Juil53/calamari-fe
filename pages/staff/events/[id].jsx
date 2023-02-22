import axios from "axios";
import { useRouter } from "next/router";
import Loading from "../../../components/Loading";

const RequestDetail = ({ event }) => {
  const router = useRouter();

  //check fallback when generate new Event Id
  if (router.isFallback) {
    return <Loading />;
  }

  //check no event id
  if (!event) return null;

  return (
    <div>
      <h1>Event: {event._id}</h1>
    </div>
  );
};

export default RequestDetail;

export const getStaticPaths = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/events`);
  const events = res.data;
  const paths = events.map((event) => ({ params: { id: event._id } }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params }) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/events/${params.id}`);
  const event = res.data;
  return {
    props: {
      event,
    },
    revalidate: 10,
  };
};
