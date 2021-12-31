import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";

const Home: NextPage = () => {
    const [show0, setShow0] = useState(true);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);

    const changeShow = async (index: number, type: number) => {
        // type == 0: next, type == 1: back

        if (index == 0) {
            setShow0(false);
            setShow1(true);
        } else if (index == 1) {
            setShow1(false);
            if (type) {
                setShow0(true);
            } else {
                setShow2(true);
            }
        } else if (index == 2) {
            setShow2(false);
            setShow1(true);
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Project Greymatter</title>
                <meta name="description" content="Caring for the elderly" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Raising awareness about the challenges faced by the elderly
                    in Singapore
                </h1>
                <section className={show0 ? styles.show : styles.hide}>
                    <div className={styles.text}>slide 0</div>
                    <button onClick={() => changeShow(0, 0)}>next</button>
                </section>
                <section className={show1 ? styles.show : styles.hide}>
                    <div className={styles.text}>slide 1</div>
                    <div>
                        <button onClick={() => changeShow(1, 0)}>next</button>
                        <button onClick={() => changeShow(1, 1)}>prev</button>
                    </div>
                </section>
                <section className={show2 ? styles.show : styles.hide}>
                    <div className={styles.text}>slide 2</div>
                    <button onClick={() => changeShow(2, 1)}>prev</button>
                </section>
            </main>
        </div>
    );
};

export default Home;
