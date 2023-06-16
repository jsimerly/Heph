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
import { fetchItemsToCart } from '../../api/fetchCart';
import GoToCart from './GoToCart';

const MobileCard = ({item, addExtraFunction}) => {
  const [itemFavorited, setFavorited] = useState(false)
  const {setCartSize, handleNotification} = useContext(ShoppingContext)
  const location = useLocation();
  const inCart = location.pathname === '/cart';
  const slug = item.slug

  let navigate = navigateProduct({slug});

  const handleAddItemClicked = async (e) =>{
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

  console.log(item)
  return (
    <ErrorBoundry fallback="Oops, Sorry! We appear to be missing something.">

    <div 
        className='w-full  min-h-[200px] rounded-md bg-white flex flex-row relative group shadow-md justify-center items-center p-2 cursor-pointer'
        onClick={navigate}
    >

      {item.main_image && (
          <img 
            src={item.main_image.image} 
            className='bg-white object-scale-down rounded-md hover:cursor-pointer aspect-square w-[40%] h-[100%]'
          />
      )}
      <div className='p-4 text-neutralDark flex flex-col items-start justify-between w-full h-full'>
        <div className='flex flex-row justify-between w-full'>
            <div className='flex flex-col justify-start min-h-[60px] w-[80%]'>
              <h3 
                  className='font-bold text-[16px] md:text-[28px] line-clamp-2'
              >
              {item.name}
              </h3>
              <h4 className='text-[12px] md:text-[22px] tracking-wide leading-none'>
                  {item.brand.name}
              </h4>
              { item.n_ratings !== 0 &&
                <div className='flex flex-row hover:cursor-pointer pt-4'>
                  <Stars rating={item.average_rating}/>
                  <div className='ml-1 text-[16px]'>
                      ({item.n_ratings})
                  </div>
                </div>
              }
            </div>
            <div onClick={handleFavoriteClicked} className='flex justify-end items-start'>
                {itemFavorited ? 
                <FavoriteIcon className={`text-secondary`} sx={{fontSize: 35}}/>
                :
                <FavoriteBorderIcon className={`text-secondary`} sx={{fontSize: 35}}/>
                }
          </div>
        </div>

        <ul className='my-3'>
          {item.key_attributes.map((attribute, i) => (
            <li key={i}>
              <span className='font-bold'>{attribute.att_name}:</span> {attribute.att_stat}
            </li>
          ))}
        </ul>

        <div className='flex flex-col w-full justify-between items-start'>
          <div className='flex justify-between w-full items-center h-[50px]'>
            <div className='grid grid-cols-2'>
              <div className='text-[26px] md:text-[36px] md:font-bold leading-none'>
                  ${item.total_cost.toFixed(2)}
              </div>
              <div className='line-through flex items-end ml-1'>
                { item.discount_bool &&             
                  <>${item.pre_discount_total.toFixed(2)}</>
                }
                </div>
              <div className='flex flex-col h-full justify-center'>
                <p className='leading-none text-[12px] md:text-[16px] text-center'>
                  For {item.days} Days
                </p>
             </div>
            </div>

            <div className='md:hidden'>
              <button 
                  className={`text-[16px] w-full h-full bg-secondary text-white rounded-md p-2 hover:underline cursor-pointer outline-none`}
                  onClick={handleAddItemClicked}
              >
                  <AddIcon/>
              </button>
            </div>
            <div className='hidden md:block'>
              <button 
                  className={`text-[18px] w-full h-full bg-secondary text-white rounded-md p-2 hover:underline cursor-pointer outline-none`}
                  onClick={handleAddItemClicked}
              >
                  Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </ErrorBoundry>
  )
}

export default memo(MobileCard);