import { useState } from "react"

const useWordle = (solution) => { 
    const [turn, setTurn] = useState(0) 
    const [currentGuess, setCurrentGuess] = useState('')
    const [guesses, setGuesses] = useState([...Array(6)]) // each guess is an array
    const [history, setHistory] = useState([]) // each guess is a string
    const [isCorrect, setIsCorrect] = useState(false)

    // format a guess into an array of letter objects 
    // e.g. [{key: 'a', color: 'yellow'}]
    const formatGuess = () => {
        let solutionArray = [...solution]
        let formattedGuess = [...currentGuess].map((l) => { 
            return {
                key: l,
                color: 'grey'
            }
        })
        formattedGuess.forEach((l,i) => { 
            if (solutionArray[i] === l.key) {
                formattedGuess[i].color = 'green'
                solutionArray[i] = null
            }
            else if (solutionArray.includes(l.key) && l.color !== 'green') {
                formattedGuess[i].color = 'yellow'
                solutionArray[solutionArray.indexOf(l.key)] = null
            }
        })
        return formattedGuess
    }

    // add a new guess to the guesses state
    // update the isCorrect state if the guess is correct
    // add one to the turn state
    const addNewGuess = (formattedGuess) => {
        if (currentGuess === solution) {
            setIsCorrect(true)
        }
        setGuesses((prev) => { 
            let newGuesses = [...prev]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })
        setHistory((prev) => { 
            return [...prev, currentGuess]
        })
        setTurn((prev) => { 
            return prev + 1
        })
        setCurrentGuess('')
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
            const formatted = formatGuess()
            addNewGuess(formatted)
        }
    }
    
    return {turn, currentGuess, guesses, isCorrect, handleKeyup}
}

export default useWordle