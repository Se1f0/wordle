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

  const getDef = async () => {
    const response = await axios.get(defBaseURL+solution+'/definitions',config)
    // console.log('response.data :>> ', response.data.definitions[0].definition);
    setDefinition(response.data.definitions[0].definition)
  }

  const getWord = async () => { 
    const response = await axios.get(randBaseURL)
    setSolution(response.data)
    // await getDef()
  }

  useEffect(() => { 
    getWord()
  },[setSolution]);
  
  return (
    <div className="App">
      <h1>Wordle</h1>
      {solution && <Wordle solution={solution}/>}
      {/* {definition && <p>The definition of {solution} is : {definition}</p>} */}
    </div>
  )
}

export default App
