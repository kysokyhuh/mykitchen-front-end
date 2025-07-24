import React from 'react'
import { useLocation } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

const Greeting = (props) => {

  const { recipeId } = useParams()
  let greeting;
  if (location.pathname === '/'){
    greeting = (
      <>
        <p className=' text-redorange'>Hey {props.user.username}!</p>
        <TypeAnimation 
          sequence={["What are you craving for today?"]}
          className='text-lg md:text-2xl'
        />

      </>
    )
  } else if (recipeId){
    greeting = (
      <>
        <p className=' text-redorange'>Hey {props.user.username}!</p>
        <TypeAnimation 
          sequence={["Ready to cook something good?"]}
          className='text-lg md:text-2xl'
        />
      </>
    )
  } else if (location.pathname === '/recipes/new' ){
    greeting = (
      <>
        <p className=' text-redorange'>Hey {props.user.username}!</p>
        <TypeAnimation 
          sequence={["Ready to share your culinary masterpiece?"]}
          className='text-lg md:text-2xl'
        />
      </>
    )
  } else if (location.pathname.endsWith('/favorites')){
    greeting = (
      <>
        <p className=' text-redorange'>Hey {props.user.username}!</p>
        <TypeAnimation 
          sequence={["Your collection of saved recipes awaits!"]}
          className='text-lg md:text-2xl'
        />
  
      </>
    )
  } else if (location.pathname.startsWith('/recipes/user/')){
    greeting = (
      <>
        <p className=' text-redorange'>Hey {props.user.username}!</p>
        <TypeAnimation 
          sequence={["Here are the delicious recipes you've shared!"]}
          className='text-base md:text-xl'
        />
      </>
    )
  } else if (location.pathname.endsWith('/change-password')) {
     greeting = (
      <>
        <p className=' text-redorange'>Hey {props.user.username}!</p>
        <TypeAnimation 
          sequence={["Change password"]}
          className='text-base md:text-xl'
        />
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
