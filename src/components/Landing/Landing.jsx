const Landing = () => {

  // place content for homepage design
  return (
    <main className=" z-0 bg-cream flex items-center justify-center min-h-screen relative ">

      <div className="absolute mx-auto font-literata text-center top-64 md:top-48 text-darksage z-20">
        <p className="text-5xl md:text-8xl font-bold">Kusina Ku</p>
        <p className=" text-2xl md:text-4xl italic">"My Kitchen"</p>
      </div>

  
        <img 
          src="../public/Home.svg" 
          alt="homebg" 
          className="w-full object-fill h-auto z-10"
        />
    
    </main>
  );
};

export default Landing;
