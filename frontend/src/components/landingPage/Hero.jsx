import { heroMain } from '../../../constants/pages/landingCopy_constant'
import { hero_banner, hero_mobile } from '../../../constants/assets/images/banners'
import navigateShopping from '../../hooks/navigateShopping'
import { LargeBlueButton} from '../utils'
import { useState } from 'react'

const Hero = () => {  
  let handleClick = navigateShopping()
  const [loaded, setLoaded] = useState(false)

  const handleImageLoad = () =>{
    setLoaded(true)
  }

  return (
    <div className='bg-primaryLight w-full text-white flex flex-col sm:flex-row items-center justify-center sm:justify-start relative sm:h-[700px] h-screen'>
      <img 
        src={hero_banner} 
        className={`bg-neutralOffWhite ${loaded? null : 'hidden'} object-scale h-full w-full hidden sm:block`} 
        onLoad={handleImageLoad}
      />
      <div className='sm:hidden h-full relative'>
        <img 
          src={hero_mobile} 
          className={`bg-neutralOffWhite ${loaded? null : 'hidden'} object-scale h-full w-full `} 
          onLoad={handleImageLoad}
        />
        <div className='bg-black h-full z-10 w-full absolute top-0 opacity-25'/>
      </div>

      <div className={`bg-neutralOffWhite ${loaded? 'hidden' : null}`}></div>
      <div className='absolute flex justify-center sm:justify-end items-center sm:h-[75%] w-full sm:w-1/2 h-full sm:bg-white sm:rounded-r-lg sm:rounded-l-none sm:rounded-md sm:min-w-[650px] -top-[80px] sm:top-auto z-20 sm:z-0'>
        <div className='flex flex-col h-full justify-end sm:justify-center items-center sm:items-start text-primary sm:w-[550px] p-3 sm:mr-[100px] gap-8'>
          <div className='h-[80px] sm:h-0'/>
          <h1 className='text-[55px] font-bold px-0 leading-[60px] sm:leading-[60px] text-center sm:text-start text-white sm:text-neutralDark hero-outline h-[45%] sm:h-auto pt-10'>
            {heroMain.title}
          </h1>
          <div className='flex flex-col justify-center items-center sm:items-start w-full gap-8 h-[55%]'>
            <p className='text-[18px] sm:text-[20px] leading-6 sm:leading-8 text-white sm:text-neutralDark text-center sm:text-start max-w-[450px] font-bold hero-outline'>
              {heroMain.desc}
            </p>
            <div className='w-[180px]'>
              <LargeBlueButton
                onClick={handleClick}
                content={heroMain.cta}
              />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero