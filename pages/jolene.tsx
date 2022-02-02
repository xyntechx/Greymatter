import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Game.module.css";
import { useState, useEffect } from "react";
import props from "../public/gameplay/jolene.json";

const Jolene: NextPage = () => {
    const [day, setDay] = useState(1);
    const [answered, setAnswered] = useState("");
    const [gameOver, setGameOver] = useState(false);

    const [money, setMoney] = useState(props.initial.money);
    const [mental, setMental] = useState(props.initial.mental);
    const [social, setSocial] = useState(props.initial.social);
    const [physical, setPhysical] = useState(props.initial.physical);
    const [emotional, setEmotional] = useState(props.initial.emotional);
    const [spiritual, setSpiritual] = useState(props.initial.spiritual);
    const [game, setGame] = useState(props.game[0]);

    useEffect(() => {
        getGame();
    }, [day]);

    const [question, setQuestion] = useState(game.question);
    const [yesChoice, setYesChoice] = useState(game.yesChoice);
    const [yesExplanation, setYesExplanation] = useState(game.yesExplanation);
    const [yesConsequence, setYesConsequence] = useState(game.yesConsequence);
    const [noChoice, setNoChoice] = useState(game.noChoice);
    const [noExplanation, setNoExplanation] = useState(game.noExplanation);
    const [noConsequence, setNoConsequence] = useState(game.noConsequence);

    const getGame = async () => {
        setGame(props.game[day]);
        
        setQuestion(game.question);
        setYesChoice(game.yesChoice);
        setYesExplanation(game.yesExplanation);
        setYesConsequence(game.yesConsequence);
        setNoChoice(game.noChoice);
        setNoExplanation(game.noExplanation);
        setNoConsequence(game.noConsequence);
    };

    const setStat = async (
        stat: string,
        consequence: {
            money: number;
            mental: number;
            social: number;
            physical: number;
            emotional: number;
            spiritual: number;
        }
    ) => {
        switch (stat) {
            case "money":
                if (consequence.money === -1000) setGameOver(true);
                setMoney(money + consequence.money);
            case "mental":
                if (consequence.mental === -1000) setGameOver(true);
                setMental(mental + consequence.mental);
            case "social":
                if (consequence.social === -1000) setGameOver(true);
                setSocial(social + consequence.social);
            case "physical":
                if (consequence.physical === -1000) setGameOver(true);
                setPhysical(physical + consequence.physical);
            case "emotional":
                if (consequence.emotional === -1000) setGameOver(true);
                setEmotional(emotional + consequence.emotional);
            case "spiritual":
                if (consequence.spiritual === -1000) setGameOver(true);
                setSpiritual(spiritual + consequence.spiritual);
        }
        PageTransitionEvent;
    };

    const answer = async (choice: string) => {
        if (day === 0) setDay(day + 1); // because there is a delay when setDay is called for the first time

        if (choice === yesChoice) {
            setAnswered(yesChoice);
            for (const stat in yesConsequence) {
                setStat(stat, yesConsequence);
            }
        } else {
            setAnswered(noChoice);
            for (const stat in noConsequence) {
                setStat(stat, noConsequence);
            }
        }
    };

    const next = () => {
        setAnswered("");
        setDay(day + 1);
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Project Greymatter</title>
                <meta name="description" content="Caring for the elderly" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {gameOver || day === 17 ? (
                <main className={styles.main}>
                    <h1 className={styles.title}>Thank You for Playing!</h1>
                    {gameOver ? (
                        <p className={styles.text}>
                            Without the proper treatment, your child wasn&apos;t
                            able to make it. The remorse and loneliness
                            afterwards haunts you overwhelmingly.
                        </p>
                    ) : (
                        <p className={styles.text}>
                            You have completed your journey!
                        </p>
                    )}
                    <br />
                    <Link href="/">
                        <a className={styles.buttonNext}>Back to Home</a>
                    </Link>
                </main>
            ) : (
                <main className={styles.main}>
                    <h1 className={styles.title}>Jolene</h1>
                    <section className={styles.stats}>
                        {money >= 0 ? (
                            <p className={styles.stat}>
                                Money <br /> ${money}
                            </p>
                        ) : (
                            <p className={styles.stat}>
                                Money <br /> -${-money}
                            </p>
                        )}
                        <p className={styles.stat}>
                            Mental Health <br /> {mental}
                        </p>
                        <p className={styles.stat}>
                            Social Health <br /> {social}
                        </p>
                        <p className={styles.stat}>
                            Physical Health <br /> {physical}
                        </p>
                        <p className={styles.stat}>
                            Emotional Health <br /> {emotional}
                        </p>
                        <p className={styles.stat}>
                            Spiritual Health <br /> {spiritual}
                        </p>
                    </section>

                    {!answered ? (
                        <>
                            <p className={styles.text}>
                                <b>Scenario</b>
                            </p>
                            <p className={styles.text}>{question}</p>
                        </>
                    ) : (
                        <></>
                    )}

                    {answered === yesChoice ? (
                        <>
                            <p className={styles.text}>
                                <b>Response</b>
                            </p>
                            <p className={styles.text}>{yesExplanation}</p>
                        </>
                    ) : (
                        <></>
                    )}

                    {answered === noChoice ? (
                        <>
                            <p className={styles.text}>
                                <b>Response</b>
                            </p>
                            <p className={styles.text}>{noExplanation}</p>
                        </>
                    ) : (
                        <></>
                    )}

                    <section className={styles.buttons}>
                        {answered ? (
                            <button
                                className={styles.buttonNext}
                                onClick={next}
                            >
                                Next Question
                            </button>
                        ) : (
                            <div className={styles.choices}>
                                <button
                                    className={styles.buttonYes}
                                    onClick={() => answer(yesChoice)}
                                >
                                    {yesChoice}
                                </button>
                                <button
                                    className={styles.buttonNo}
                                    onClick={() => answer(noChoice)}
                                >
                                    {noChoice}
                                </button>
                            </div>
                        )}
                    </section>
                </main>
            )}
        </div>
    );
};

export default Jolene;
