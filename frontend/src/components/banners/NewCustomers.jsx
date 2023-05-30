import { grass_banner } from '../../../constants/assets/images/banners'
import navigateShopping from '../../hooks/navigateShopping'
import { LargeWhiteButton, LargeBlueButton } from '../utils'

const NewCustomers = () => {
  let navShopping = navigateShopping()

  const handleClick = () => {
    navShopping()
  }
  
  return (
    <div 
      className='flex w-full rounded-md cursor-pointer bg-gradient-to-bl relative'
      onClick={handleClick}
    >
      <img src={grass_banner}
      className='flex rounded-md'
      />
      <div className='absolute flex w-full h-full'>
        <div 
          className='w-full h-full flex items-center  justify-center text-center text-white text-[58px] font-[900] leading-none p-3 br-text-outline-thick-banner'
        >
          All Yard Tools are <span className='text-[66px]'> &nbsp; 20% </span> &nbsp; Off
        </div>
        <div className='min-w-[30%] flex justify-center items-center'>
          <div className='w-[180px] h-[60px] shadow-md'>
            <button className='bg-white rounded-md p-2 w-full h-full text-secondary text-[20px] font-bold hover:underline hover:shadow-md'>
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewCustomers