import styles from '../../styles'
import { LinkPath } from '../utils/LinkPath';

const ShoppingHero = ({categoryInfo}) => {  
  return (
    <div className='w-full flex flex-col relative bg-primaryLight h-[200px] sm:h-[400px]'>
        {categoryInfo && (
            <img
                src={categoryInfo.image}
                className='w-full h-full object-cover'
            />
        )}
        <div className="absolute h-full w-full">
            <div className={`${styles.flexCenter} h-full`}>
                <div className={`${styles.boxWidth} flex justify-center sm:justify-start`}>
                    {categoryInfo && (
                        <div className='bg-white w-[90%] sm:w-2/3 rounded-md my-2 p-6 sm:p-10 sm:justify-start flex flex-col items-start'>
                            <div className='flex flex-col items-start'>
                                <div className='text-[10px] sm:text-[12px] flex'>
                                    <LinkPath category={categoryInfo.parent}/>                     
                                </div>
                                <h1 className='font-bold  text-[36px] sm:text-[60px] leading-none'>
                                    {categoryInfo.name}
                                </h1>
                            </div>

                            <p className='text-[10px] sm:text-[20px] mt-4'>
                                {categoryInfo.desc}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ShoppingHero