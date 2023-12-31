import { useEffect, useState } from "react"
import LapList from "./LapList"
import TimerControls from "./TimerControls"
import TimerDisplay from "./TimerDisplay"
import "./Timer.css"

const Timer = (): JSX.Element => {
    const [milliseconds, setMilliseconds] = useState<number>(0)
    const [timerOn, setTimerOn] = useState<boolean>(false)
    const [laps, setLaps] = useState<string[]>([])

    const formatTime = (): string => {
        const minutes = ("0" + Math.floor(milliseconds / 60000) % 60).slice(-2)
        const seconds = ("0" + Math.floor(milliseconds / 1000) % 60).slice(-2)
        const centiseconds = ("0" + Math.floor(milliseconds / 10) % 100).slice(-2)

        return `${minutes}:${seconds}:${centiseconds}`
    }

    const startTimer = (): number => {
        return setInterval(() => {
            setMilliseconds((prevMilliseconds) => prevMilliseconds + 10)
        }, 10)
    }

    const stopTimer = (interval: number): number => {
        clearInterval(interval)
        return interval
    }

    const resetTimer = (): void => {
        setMilliseconds(0);
        setTimerOn(false);
        setLaps([])
    }

    const addLap = (): void => {
        setLaps([...laps, formatTime()]);
    }

    useEffect(() => {
        let interval: number = 0;

        if (timerOn) interval = startTimer()
        else interval = stopTimer(interval)

        return () => stopTimer(interval)
    }, [timerOn])

    return (
        <div className="timer-container">
            <TimerDisplay time={formatTime()} />
            <TimerControls
                timerOn={timerOn}
                onStart={() => setTimerOn(true)}
                onStop={() => setTimerOn(false)}
                onReset={() => resetTimer()}
                onLap={() => addLap()}
            />
            <LapList lapList={laps} />
        </div>
    )
}

export default Timer
