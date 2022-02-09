import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Game.module.css";
import { useState, useEffect } from "react";
import props from "../public/gameplay/josh.json";

const Josh: NextPage = () => {
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
                setMoney(money + consequence.money);
                if (money <= 0) setGameOver(true);
            case "mental":
                setMental(mental + consequence.mental);
                if (mental <= 0) setGameOver(true);
            case "social":
                setSocial(social + consequence.social);
                if (social <= 0) setGameOver(true);
            case "physical":
                setPhysical(physical + consequence.physical);
                if (physical <= 0) setGameOver(true);
            case "emotional":
                setEmotional(emotional + consequence.emotional);
                if (emotional <= 0) setGameOver(true);
            case "spiritual":
                setSpiritual(spiritual + consequence.spiritual);
                if (spiritual <= 0) setGameOver(true);
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
        if (
            money <= 0 ||
            mental <= 0 ||
            social <= 0 ||
            physical <= 0 ||
            emotional <= 0 ||
            spiritual <= 0
        )
            setGameOver(true);
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Project Greymatter</title>
                <meta name="description" content="Caring for the elderly" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {gameOver || day === 17 ? (
                <main className={styles.mainEnd}>
                    <h1 className={styles.title}>Thank You for Playing!</h1>
                    {gameOver ? (
                        <>
                            {money <= 0 ? (
                                <p className={styles.text}>
                                    Make sure to save up your money next time!
                                    You have become too broke to continue.
                                </p>
                            ) : (
                                <></>
                            )}

                            {mental <= 0 ? (
                                <p className={styles.text}>
                                    Take care of your mental health next time!
                                    You have been diagnosed with one of/some of
                                    the common mental illness(es) the elderly
                                    are susceptible to.
                                </p>
                            ) : (
                                <></>
                            )}

                            {social <= 0 ? (
                                <p className={styles.text}>
                                    Seize the opportunities to socialise with
                                    your friends next time! You have become too
                                    lonely to continue.
                                </p>
                            ) : (
                                <></>
                            )}

                            {physical <= 0 ? (
                                <p className={styles.text}>
                                    Take care of your physical health next time!
                                    You have been admitted to the hospital due
                                    to the complications your body has
                                    sustained...
                                </p>
                            ) : (
                                <></>
                            )}

                            {emotional <= 0 ? (
                                <p className={styles.text}>
                                    Take care of your emotions next time! You
                                    have been too overwhelmed with negative
                                    feelings to continue.
                                </p>
                            ) : (
                                <></>
                            )}

                            {spiritual <= 0 ? (
                                <p className={styles.text}>
                                    Be faithful to your beliefs next time! You
                                    have become possessed.
                                </p>
                            ) : (
                                <></>
                            )}
                        </>
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
                    <h1 className={styles.title}>Josh</h1>
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

export default Josh;
