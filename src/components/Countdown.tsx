import { useState, useEffect, useContext } from 'react';
import styles from '../styles/components/Countdown.module.css'
import { ChallengesContext } from '../contexts/ChallengesContext'

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
    const { startNewChallenge } = useContext(ChallengesContext)
    
    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setisActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time/60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function startCountdown() {
        setisActive(true);
    }

    function resetCountdown() {
        // Impedir que você execute o timeout 
        clearTimeout(countdownTimeout)
        setisActive(false)
        setTime(0.1 * 60)
    }

    // useEffect: quando algo mudar, execute isso
    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime((prevState) => prevState-1)
            }, 1000)
        }else if (isActive && time == 0) {
            setHasFinished(true);
            setisActive(false);
            startNewChallenge();
        }
    }, [isActive, time])

    return (
        <div>
            <div className={styles.countdownContainer}>
            <div>
                <span>{minuteLeft}</span>
                <span>{minuteRight}</span>
            </div>
            <span>:</span>
            <div>
                <span>{secondLeft}</span>
                <span>{secondRight}</span>
            </div> 
            </div>

            { hasFinished ? (
                <button 
                disabled 
                className={styles.countdownButton}>
                Ciclo encerrado
                
            </button>
            ) : (
                <>
                {isActive ? (
                <button type="button" onClick={resetCountdown} className={`${styles.countdownButton} ${styles.countdownButtonActive}`}>
                Abandonar ciclo
                
                </button>
            ) : (
                <button type="button" onClick={startCountdown} className={styles.countdownButton}>
                Iniciar ciclo
                
                </button>
            )}
                </>
            )}

        </div>
        
    );
}