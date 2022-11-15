import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Layout from "../components/Layout.jsx";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import 'bootstrap/dist/css/bootstrap.css';
import "../styles/globals.scss";
import { useEffect } from "react";

config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  useEffect(()=>{
    import("/node_modules/bootstrap/dist/js/bootstrap");
},[])

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
