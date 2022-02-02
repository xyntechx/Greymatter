import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import logo from "../public/logo.png";

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Project Greymatter</title>
                <meta name="description" content="Caring for the elderly" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Project Greymatter</h1>
                <Image
                    src={logo}
                    width={250}
                    height={250}
                    alt="Project Greymatter Logo"
                />
                <br />
                <p className={styles.text}>Choose your character:</p>
                <section className={styles.links}>
                    <Link href="/anne">
                        <a className={styles.buttonAnne}>Anne</a>
                    </Link>
                    <Link href="/rishabh">
                        <a className={styles.buttonRishabh}>Rishabh</a>
                    </Link>
                    <Link href="/jolene">
                        <a className={styles.buttonJolene}>Jolene</a>
                    </Link>
                    <Link href="/josh">
                        <a className={styles.buttonJosh}>Josh</a>
                    </Link>
                </section>
            </main>
        </div>
    );
};

export default Home;
