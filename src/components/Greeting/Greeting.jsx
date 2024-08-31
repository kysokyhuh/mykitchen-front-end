import React from 'react'

const Greeting = (props) => {
  return (
    <div className=' ml-10 mb-9 mt-8 font-literata italic md:text-4xl text-2xl font-semibold'>
        <p className=' text-redorange'>Hey {props.user.username}!</p>
        <p className=' text-lg md:text-2xl '>What are you craving for today?</p> 
    </div>
  )
}

export default Greeting
