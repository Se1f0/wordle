import React, { useState } from 'react'

export default function Keypad({usedKeys}) {
    const [letters, setLetters] = useState([
        'a' , 'b' , 'c' , 'd' , 'e' , 'f' ,
        'g' , 'h' , 'i' , 'j' , 'k' , 'l' ,
        'm' , 'n' , 'o' , 'p' , 'q' , 'r' ,
        's' , 't' , 'u' , 'v' , 'w' , 'x' ,
        'y', 'z'
    ])
    return (
        <div className='keypad'>
            {letters && letters.map((l,i) => {
                const color = usedKeys[l]

                return (
                    <div key={i} className={color} >{l.toUpperCase()}</div>
                )
            })}
        </div>
    )
}
