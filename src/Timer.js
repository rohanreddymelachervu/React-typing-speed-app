import React, {useState, useEffect} from 'react'
export default function Timer(props){
    const {correctWords, startCounting} = props
    const [timeElapsed, setTimeElapsed] = useState(0)
    useEffect(() => {
        let id
        if(startCounting){
            id = setInterval(() => {
                setTimeElapsed(oldTime => oldTime + 1)
            }, 1000)
        }
        return () => {
            clearInterval(id)
        }
    }, [startCounting])
    const minutes = timeElapsed/60
    return(
        <div>
            <p>Time: {timeElapsed} </p>
            <p>Speed: {((correctWords/minutes).toFixed(2) || 0)} WPM </p>
        </div>
    )
}