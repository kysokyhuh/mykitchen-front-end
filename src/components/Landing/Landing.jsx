import homeImg from '/Home.svg'
import { TypeAnimation } from 'react-type-animation';

const Landing = () => {
  const text ="this is a test"
  // place content for homepage design
  return (
    <main className=" z-0 bg-cream flex items-center justify-center min-h-screen relative ">

      <div className="absolute mx-auto font-literata text-center top-64 md:top-48 text-darksage z-20">
        <p className="text-5xl md:text-8xl font-bold">Kusina Ku</p>
        <p className=" text-2xl md:text-4xl italic">"My Kitchen"</p>
       
       
        <div className=' mt-1 md:mt-9'>
          <TypeAnimation
              sequence={[
                'Share Your Recipes',
                1000, 
                'Explore New Recipes',
                1000,
                'Save Your Favorite Recipes',
                1000,
                'Join the Community!',
                1000
              ]}
              wrapper="span"
              speed={50}
              className=' mx-auto text-lg md:text-2xl'
              repeat={Infinity}
            />
        </div>
      </div>

        <img 
          src={homeImg}
          alt="homebg" 
          className="w-full object-fill h-auto z-10"
        />
    
    </main>
  );
};

export default Landing;
