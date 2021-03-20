import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>[title of stream]</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="[title of stream]" />
        <p className="description">
          Join <a href="https://twitch.tv/itsaydrian">Aydrian</a>,{" "}
          <a href="https://twitch.tv/chloecondon">Chloe</a>, and{" "}
          <a href="https://twitch.tv/LaRenaiocco">LaRena</a> Monday nights at
          3pm Pacific/6pm Eastern.
        </p>
      </main>

      <Footer />
    </div>
  );
}
