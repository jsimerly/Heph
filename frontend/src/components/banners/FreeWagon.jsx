import { free_tool_banner } from '../../../constants/assets/images/banners'
import navigateShopping from '../../hooks/navigateShopping'
import { LargeWhiteButton } from '../utils'

const FreeWagon = () => {
  let navShopping = navigateShopping()

  const handleClick = () => {
    navShopping()
  }

  return (
    <div 
      className='flex w-full rounded-md cursor-pointer bg-gradient-to-bl  relative'
      onClick={handleClick}
    >
      <img src={free_tool_banner}
      className='flex rounded-md'
      />
        <div 
          className='absolute w-[90%] h-full flex justify-start items-center'
        >
            <div className=' w-[45%] flex flex-col justify-center items-center text-white font-bold text-[24px] md:text-[30px]'>
                <h1>
                    Orders Over $100
                </h1>
                <h1 className='pl-16'>
                    Get a <span className='bg-primary text-white pl-2 m-1 p-1 pr-2 rounded-md'> Free Tool Kit </span> 
                </h1>
            </div>
            <div className='w-[180px]'>
            <LargeWhiteButton
              content='Shop Now' 
            />
          </div>
        </div>
    </div>
  )
}

export default FreeWagon