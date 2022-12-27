import "@fortawesome/fontawesome-svg-core/styles.css";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "../styles/globals.scss";
import { config } from "@fortawesome/fontawesome-svg-core";
import Layout from "../components/Layout.jsx";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";

config.autoAddCss = false;

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url, { shallow }) => setLoading(true);
    const handleEnd = (url, { shallow }) => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleEnd);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleEnd);
    };
  }, []);

  if (loading) return <Loading />;

  if (Component.getLayout) {
    return (
      <SessionProvider session={session}>
        {Component.getLayout(<Component {...pageProps} />)}
      </SessionProvider>
    );
  }

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
