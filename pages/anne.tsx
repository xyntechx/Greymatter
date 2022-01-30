import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import props from "../public/gameplay/anne.json";

const Anne: NextPage = () => {
    const [day, setDay] = useState(1);
    const [answered, setAnswered] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const [money, setMoney] = useState(props.initial.money);
    const [mental, setMental] = useState(props.initial.mental);
    const [social, setSocial] = useState(props.initial.social);
    const [physical, setPhysical] = useState(props.initial.physical);
    const [emotional, setEmotional] = useState(props.initial.emotional);
    const [spiritual, setSpiritual] = useState(props.initial.spiritual);
    const [game, setGame] = useState(props.game.day1);

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
        switch (day) {
            case 1:
                setGame(props.game.day1);
                break;
            case 2:
                setGame(props.game.day2);
                break;
            case 3:
                setGame(props.game.day3);
                break;
            case 4:
                setGame(props.game.day4);
                break;
            case 5:
                setGame(props.game.day5);
                break;
            case 6:
                setGame(props.game.day6);
                break;
            case 7:
                setGame(props.game.day7);
                break;
            case 8:
                setGame(props.game.day8);
                break;
            case 9:
                setGame(props.game.day9);
                break;
            case 10:
                setGame(props.game.day10);
                break;
            case 11:
                setGame(props.game.day11);
                break;
            case 12:
                setGame(props.game.day12);
                break;
            case 13:
                setGame(props.game.day13);
                break;
            case 14:
                setGame(props.game.day14);
                break;
            case 15:
                setGame(props.game.day15);
                break;
            case 16:
                setGame(props.game.day16);
                break;
        }
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
        setAnswered(true);
        if (day === 1) setDay(day + 1); // because there is a delay when setDay is called for the first time

        if (choice === yesChoice) {
            for (const stat in yesConsequence) {
                setStat(stat, yesConsequence);
            }
        } else {
            for (const stat in noConsequence) {
                setStat(stat, noConsequence);
            }
        }
    };

    const next = () => {
        setAnswered(false);
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
                    <h1>Game Over</h1>
                    {gameOver ? (
                        <p>
                            Without the proper treatment, your child wasn&apos;t able
                            to make it. The remorse and loneliness afterwards
                            haunts you overwhelmingly.
                        </p>
                    ) : (
                        <p>Thanks for playing!</p>
                    )}
                </main>
            ) : (
                <main className={styles.main}>
                    <h1 className={styles.title}>Anne</h1>
                    {money >= 0 ? (
                        <p>Money: ${money}</p>
                    ) : (
                        <p>Money: -${-money}</p>
                    )}
                    <p>Mental Health: {mental}</p>
                    <p>Social Health: {social}</p>
                    <p>Physical Health: {physical}</p>
                    <p>Emotional Health: {emotional}</p>
                    <p>Spiritual Health: {spiritual}</p>
                    <h1 className={styles.title}>{question}</h1>

                    {answered ? (
                        <>
                            <p>{yesExplanation}</p>
                            <p>{noExplanation}</p>
                        </>
                    ) : (
                        <></>
                    )}

                    <button onClick={() => answer(yesChoice)}>
                        {yesChoice}
                    </button>
                    <button onClick={() => answer(noChoice)}>{noChoice}</button>
                    {answered ? (
                        <button onClick={next}>Next Question</button>
                    ) : (
                        <></>
                    )}
                </main>
            )}
        </div>
    );
};

export default Anne;
