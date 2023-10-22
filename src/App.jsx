/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import axios from "axios"
import Wordle from "./components/Wordle"

function App() {
  const randBaseURL = "https://random-word-api.herokuapp.com/word?length=5"
  const defBaseURL = "https://wordsapiv1.p.rapidapi.com/words/"

  const config = {
    headers: {
    'X-RapidAPI-Key': '752edc8739msh164f1c27d8fd3dcp1c3a0ajsn6f02cc5b28b0',
    'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
  }
  }

  const [solution,setSolution] = useState(null)
  const [definition,setDefinition] = useState(null)
  const [partofSpeech,setPartofSpeech] = useState(null)
  const [isError,setIsError] = useState(false)

  const getDef = async () => {
    if (solution) {
      try {
        const response = await axios.get(defBaseURL+solution+'/definitions',config)
        if (response.data.definitions.length > 0) {
          setIsError(false)
          setDefinition(response.data.definitions[0].definition)
          setPartofSpeech(response.data.definitions[0].partOfSpeech)
        }
        else {
          setIsError(true)
        }
      } catch (error) {
        setIsError(true)
        console.error('An error occurred:', error);
      }
    }
  }

  const getWord = async () => {
    setIsError(false)
    const response = await axios.get(randBaseURL)
    setSolution(response.data[0])
  }

  useEffect(() => { 
    getWord()
  },[]);

  useEffect(() => { 
    getDef()
  },[solution]);

  useEffect(() => { 
    if (isError) {
      getWord()
    }
  },[isError]);


  return (
    <div className="App">
      <h1>Guess The Word</h1>
      {solution && <Wordle solution={solution} definition= {definition} partofSpeech={partofSpeech} />}
    </div>
  )
}

export default App
