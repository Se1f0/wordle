import { useState } from "react"

const useWordle = (solution) => { 
    const [turn, setTurn] = useState(0) 
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([]) // each guess is an array
    const [history, setHistory] = useState([]) // each guess is a string
    const [isCorrect, setIsCorrect] = useState(false)

    // format a guess into an array of letter objects 
    // e.g. [{key: 'a', color: 'yellow'}]
    const formatGuess = () => {
        console.log('currentGuess :>> ', currentGuess);
    }

    // add a new guess to the guesses state
    // update the isCorrect state if the guess is correct
    // add one to the turn state
    const addNewGuess = () => {

    }

    // handle keyup event & track current guess
    // if user presses enter, add the new guess
    const handleKeyup = ({key}) => {
        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess(prev => prev + key)
            }
        }
        if (key === 'Backspace') {
            setCurrentGuess(prev => prev.slice(0,-1))
        }
        if (key === 'Enter') {
            if (turn > 5) {
                console.log('You used all your turns')
                return
            }
            if (history.includes(currentGuess)) {
                console.log('You already entered this word')
                return
            }
            if (currentGuess.length !== 5) {
                console.log('You must enter a word that contains 5 letters')
                return
            }
            formatGuess()
        }
    }
    
    return {turn, currentGuess, guesses, isCorrect, handleKeyup}
}

export default useWordle