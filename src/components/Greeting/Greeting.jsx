import React from 'react'
import { useLocation } from 'react-router-dom'
import { useParams } from 'react-router-dom';
const Greeting = (props) => {

  const { recipeId } = useParams()
  let greeting;
  if (location.pathname === '/'){
    greeting = (
      <>
        <p className=' text-redorange'>Hey {props.user.username}!</p>
        <p className=' text-lg md:text-2xl '>What are you craving for today?</p> 
      </>
    )
  } else if (recipeId){
    greeting = (
      <>
        <p className=' text-redorange'>Hey {props.user.username}!</p>
        <p className=' text-lg md:text-2xl '>Ready to cook something good?</p> 
      </>
    )
  } else if (location.pathname === '/recipes/new' ){
    greeting = (
      <>
        <p className=' text-redorange'>Hey {props.user.username}!</p>
        <p className=' text-lg md:text-xl '>Ready to share your culinary masterpiece?</p> 
      </>
    )
  } else if (location.pathname.endsWith('/favorites')){
    greeting = (
      <>
        <p className=' text-redorange'>Hey {props.user.username}!</p>
        <p className=' text-lg md:text-2xl '>Your collection of saved recipes awaits!</p> 
      </>
    )
  } else if (location.pathname.startsWith('/recipes/user/')){
    greeting = (
      <>
        <p className=' text-redorange'>Hey {props.user.username}!</p>
        <p className=' text-lg md:text-xl '>Look at the delicious recipes you've shared!</p> 
      </>
    )
  }


  return (
    <div className=' ml-10 mb-9 mt-24 font-literata italic md:text-4xl text-2xl font-semibold'>
       {greeting}
    </div>
  )
}

export default Greeting
