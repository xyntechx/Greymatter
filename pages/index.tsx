import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";

import { gameEvents } from "../public/json/gameEvents";

const Home: NextPage = ({ slides }) => {

    const[slide, setSlide] = useState<JSX.Element>( // no idea if i should put jsx into a state or if there's something better
        <div>
            <button onClick={() => showSlide(0)}>Start Game</button>
        </div>
    )

    const showSlide = async (index: number) => {
        if (slides[index].payday != null) {
            setSlide(
                <p>Payday</p>
            )
        } else {
            setSlide(
                <div>
                    <div className={styles.text}>{ slides[index].text }</div>
                    <div>
                        <button onClick={() => results(index, 0)}>{ slides[index].options[0].option }</button>
                        <button onClick={() => results(index, 1)}>{ slides[index].options[1].option }</button>
                    </div>
                </div>
            )
        }
    }

    const results = async (index: number, option: number) => {
        // 0: first option, 1: second option
        setSlide(
            <div>
                <div className={styles.text}>{ slides[index].options[option].text }</div>
                <button onClick={() => nextSlide(index)}>Next</button>
            </div>
        )
    }

    const nextSlide = async (index: number) => {
        if (index + 1 > slides.length) {
            setSlide(
                <div>
                    <div className={styles.text}>Game Finished</div>
                </div>
            )
        } else {
            showSlide(index + 1)
        }
    }

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
                { slide }
            </main>
        </div>
    );
};

export const getStaticProps = async () => {
    return {
        props: {
            slides: gameEvents
        }
    }
}

export default Home;
