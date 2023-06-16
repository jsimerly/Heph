import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import navigateProduct from '../../hooks/navigateProduct';
import { BlueButton, Stars } from '../utils';
import { useEffect, useState, memo } from 'react';
import { useContext } from 'react';
import { ShoppingContext } from '../../context';
import { useLocation } from 'react-router-dom';
import ErrorBoundry from '../utils/ErrorBoundry';
import { addToFavorites } from './addTo';
import GoToCart from './GoToCart';
import { fetchItemsToCart } from '../../api/fetchCart';

const ProductCard = ({item, addExtraFunction}) => {
  const [itemFavorited, setFavorited] = useState(false)
  const {setCartSize, handleNotification} = useContext(ShoppingContext)
  const location = useLocation();
  const inCart = location.pathname === '/cart';
  const slug = item.slug

  let navigate = navigateProduct({slug});

  const handleAddItemClicked = async (e) =>{
    console.log(e)
    e.stopPropagation();
    const response = await fetchItemsToCart([item])
    if (response.ok){
      const resp = await response.json()
      setCartSize(resp['cart_size'])

      if (addExtraFunction){
        addExtraFunction()
      }

      if (!inCart){ 
        handleNotification(`${item.name} has been added to your cart.`, <GoToCart/>, false)
      } else {
        handleNotification(`${item.name} has been added to your cart.`, null, false)
      }
    } else {
      handleNotification(`We're currently experiencing issues and were unable to add ${item.name} to your cart.`)
    }
  }
  
  const handleFavoriteClicked = async (e) => {
    e.stopPropagation();
    addToFavorites(item, setFavorited)
  }

  useEffect(()=> {
    setFavorited(item.favorited)
  }, [item.favorited])

  return (
    <ErrorBoundry fallback="Oops, Sorry! We appear to be missing something.">

    <div 
      className='w-[160px] h-[285px] sm:h-[486px] sm:min-w-[300px] rounded-md bg-white sm:pt-2 sm:px-2 flex flex-col relative group hover:shadow-lg shadow-md cursor-pointer'
      onClick={navigate}
    >
      {item.main_image && (
        <>
          <img 
            src={item.main_image.image} 
            className='bg-white object-scale-down rounded-md hover:cursor-pointer aspect-square'

          />
          <div 
            className={`absolute right-0 mr-6 mt-4 hover:scale-110 cursor-pointer ${itemFavorited? 'block' : 'hidden'} group-hover:block`}
            onClick={(e) => handleFavoriteClicked(e)}
            >
            {itemFavorited ? 
              <FavoriteIcon className={`text-secondary`} sx={{fontSize: 30}}/>
              :
              <FavoriteBorderIcon className={`text-secondary`} sx={{fontSize: 30}}/>
            }
            
          </div>
        </>
      )}
      <div className='text-neutralDark flex flex-col h-full p-2'>
        <div className='flex flex-col min-h-[60px]'>
          <h3 
            className='font-bold text-[16px] hover:cursor-pointer hover:underline line-clamp-2'
          >
           {item.name}
          </h3>
          <h4 className='text-[12px]  tracking-wide'>
            {item.brand.name}
          </h4>
        </div>
        <div className='hidden sm:block'>
          {item.n_ratings != 0 ?
          <div className='flex flex-row pt-2 hover:cursor-pointer'>
            <Stars rating={item.average_rating}/>
            <div className='ml-1 '>
            ({item.n_ratings})
            </div>
          </div>
          :
           <div className='h-[30px]'>
           </div>
          }
        </div>
        <div className='flex flex-col flex-1 w-full justify-end items-start pb-1'>
          <div className='flex justify-between w-full items-center h-[50px]'>
            <div className='grid grid-cols-2'>
              <div className='text-[20px] md:text-[26px] md:font-bold leading-none'>
                  ${item.total_cost.toFixed(2)}
              </div>
              <div className='line-through flex items-end ml-1 text-[10px] sm:text-[14px]'>
                { item.discount_bool &&             
                  <>${item.pre_discount_total.toFixed(2)}</>
                }
              </div>
              <div className='flex flex-col h-full justify-center'>
                <p className='leading-none text-[10px] md:text-[12px] text-center'>
                  For {item.days} Days
                </p>
             </div>
            </div>
            <div className='h-full hidden sm:block'>
              <button 
                  className={`text-[16px] w-full h-full bg-secondary text-white rounded-md p-2 hover:underline cursor-pointer outline-none`}
                  onClick={handleAddItemClicked}
              >
                Add to Cart
              </button>
            </div>
            <div className='sm:hidden'>
              <button 
                    className={`text-[16px] w-full h-full bg-secondary text-white rounded-md p-1 hover:underline cursor-pointer outline-none`}
                    onClick={handleAddItemClicked}
                >
                  <AddIcon/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </ErrorBoundry>
  )
}

export default memo(ProductCard);