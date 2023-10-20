/* eslint-disable react/prop-types */
export default function Modal({isCorrect , turn , solution}) {
  return (
    <div className='modal'>
        {isCorrect && (
            <div>
                <h1>You Got it right !</h1>
                <p className='solution'> {solution} </p>
                <p>You found the solution in {turn} guesses !</p>
            </div>
        )}
        {!isCorrect && (
            <div>
                <h1>Unlucky...</h1>
                <p className='solution'> {solution} </p>
                <p>Better luck for the next time</p>
            </div>
        )}
    </div>
  )
}
