import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>CoderDojo Braga</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Shuriken</h1>
        <p className={styles.typing}>Comming soon...</p>
      </main>
    </div>
  );
}
