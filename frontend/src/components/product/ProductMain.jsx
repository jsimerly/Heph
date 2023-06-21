import { useEffect, useState, useContext } from 'react';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';

import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';

import { LargeBlueButton, QuantInput, Stars } from '../utils';
import { fetchItemFavorited, fetchItemsToCart } from '../../api/fetchCart';
import { ShoppingContext } from '../../context';
import navigateCart from '../../hooks/navigateCart';

const ProductMain = ({mainCardInfo}) => {
    const [quant, setQuant] = useState(1)
    const [insured, setInsured] = useState(false)
    const [mainImg, setMainImg] = useState()
    const [itemFavorited, setFavorited] = useState(false)
    const {setCartSize, handleNotification} = useContext(ShoppingContext)

    useEffect(()=>{
      if(mainCardInfo){
        setMainImg(mainCardInfo.mainImg)
        setFavorited(mainCardInfo.favorited)
      }
    }, [mainCardInfo])

    const handleInsuredClicked = () => {
      setInsured(!insured)
    }

    const handleFavoriteClicked = async () => {
      const response = await fetchItemFavorited(mainCardInfo.slug)
      const resp = await response.json()
      setFavorited(resp.favorited)
    }

    const GoToCart = () => (
      <div 
        className='cursor-pointer hover:underline px-2 py-1 bg-primary text-white rounded-md'
        onClick={navigateCart()}
      >
        View Cart & Check Out
      </div>
    )

    const handleAddToCart = async () => {
      const cartItem = {
        slug: mainCardInfo.slug,
        quantity: quant,
        insurancePurchased: insured,
      }
      const response = await fetchItemsToCart([cartItem])
      if (response.ok){
        const resp = await response.json()
        setCartSize(resp['cart_size'])
        handleNotification(`${mainCardInfo.name} has been added to your cart.`, <GoToCart/>)
      } else {
        handleNotification(`We're currently experiencing issues and were unable to add ${mainCardInfo.name} to your cart.`)
      }
    }

  return (

        <div className="flex">
          <div className="flex flex-row w-1/2">
            <div className='flex max-h-[525px]'>
              <div className="w-[20%] overflow-hidden hover:overflow-y-auto scrollbar-hide">
              {mainCardInfo && mainCardInfo.imgList.map((image, index) => 
              { 
                const image_path = image.image
                return (
                  <img
                      key={index}
                      src={image_path}
                      onClick={() => setMainImg(image_path)}
                      className='border border-white rounded-md mb-4 cursor-pointer aspect-square shadow-sm'
                  />)
              })}
              </div>
              <div className="rounded-md mx-3 w-full">
                {mainImg &&
                  <img
                    src={mainImg}
                    className='aspect-square rounded-md'
                  />
                }

              </div>
            </div>
          </div>
          <div className="w-1/2 flex flex-col items-center text-neutralDark px-6">
            <div className='flex flex-row justify-between w-full'>
              {mainCardInfo && 
                <div className='flex flex-col'>
                  <h1 className='text-[24px] font-bold leading-none'>
                    {mainCardInfo.name}
                  </h1>
                  <h2 className='text-[18px] '>
                    {mainCardInfo.brand}
                  </h2>
                </div>
              }

              <div 
                className='cursor-pointer hover:scale-110'
                onClick={handleFavoriteClicked}
              >
                {itemFavorited ? 
                  <FavoriteIcon className={`text-secondary`} sx={{fontSize: 30}}/>
                  :
                  <FavoriteBorderIcon className={`text-secondary`} sx={{fontSize: 30}}/>
                }
              </div>

            </div>
            <div className='flex justify-between items-center w-full mt-6'>
            {mainCardInfo &&
              <div className='grid grid-cols-2 items-end'>
                  <h3 className='text-[30px] leading-none font-bold'>
                    ${mainCardInfo.price.toFixed(2)}
                  </h3>
                  <div className='line-through flex items-end ml-1 text-[20px]'>
                    {mainCardInfo.discount_bool &&
                      <>${mainCardInfo.pre_discount_price.toFixed(2)}</>
                    }
                  </div>
                <p className='leading-none text-[14px] text-center'>
                  For {mainCardInfo.days} {mainCardInfo.days === 1 ? 'Day' : 'Days'}
                </p>
              </div>
              }
              {mainCardInfo && mainCardInfo.nRatings !== 0 &&
                <div className='text-secondary'>
                  <Stars rating={mainCardInfo.rating} size='30px'/>
                  <span className='ml-2 text-neutralDark'>
                    ({mainCardInfo.nRatings})
                  </span>
                </div>
              }

            </div>

            {mainCardInfo && mainCardInfo.insurance !== null &&
              <div className='w-full mt-6'>
                <div className='flex grow-0 cursor-pointer group items-center'
                  onClick={handleInsuredClicked}
                >
                  {insured ? 
                  <VerifiedUserIcon
                    sx={{fontSize: '25px'}}
                    className='text-secondary group-hover:scale-105'
                  /> 
                  : 
                  <ShieldOutlinedIcon
                    sx={{fontSize: '25px'}}
                    className='text-secondary group-hover:scale-105'
                  />}
                  <div className='text-[16px] ml-2 group-hover:underline'>
                    Insure for <span className='font-bold'> ${mainCardInfo.insurance.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            }

            {mainCardInfo && 
              <div className='w-full flex flex-col justify-start mt-6'>
                <div>
                  <h3 className='font-semibold text-[14px]'>
                    Product Description
                  </h3>
                  <p className='text-[14px]'>
                    {mainCardInfo.desc}
                  </p>
                  <ul className='pt-6'>
                  {mainCardInfo && mainCardInfo.keyAttributes.map((bullet, i) => (
                    <li key={i}>
                      {bullet.att_name}:<span className='ml-1 font-bold'>{bullet.att_stat}</span> 
                    </li>
                    ))}
                  </ul>
                </div>
              </div>
            }
            <div className='w-full mt-6 p-2'>
              <div className='flex flex-row w-full justify-center '>
                <div className='w-[120px]'>
                  <QuantInput
                    quant={quant}
                    setQuant={setQuant}
                  />
                </div>
                <div className='w-full  mx-4'>
                  <LargeBlueButton
                    content='Add to Cart'
                    onClick={handleAddToCart}
                  />
                </div>
              </div>
              <div className='w-full flex justify-center'>              
                <div className='inline-flex flex-row mt-6 gap-6'>
                  <div className='flex flex-col gap-3'>
                    <div className='flex flex-row items-center'>
                      <LocalShippingOutlinedIcon sx={{fontSize:33}}className='border-secondaryLight border-2 bg-white rounded-full p-1 mr-2'/>
                      Free Shipping
                    </div>
                    <div className='flex flex-row items-center'>
                      <BuildOutlinedIcon sx={{fontSize:33}}className='border-secondaryLight border-2 bg-white  rounded-full p-1 mr-2'/>
                      Normal Use Damage Covered
                    </div>
                  </div>
                  <div className='flex flex-col gap-3'>
                    <div className='flex flex-row items-center'>
                      <EditCalendarOutlinedIcon sx={{fontSize:33}}className='border-secondaryLight border-2 bg-white rounded-full p-1 mr-2'/>
                      Early Return
                    </div>
                    <div className='flex flex-row items-center'>
                      <VerifiedOutlinedIcon sx={{fontSize:33}}className='border-secondaryLight border-2 bg-white rounded-full p-1 mr-2'/>
                      100% Quality Guarantee
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

  )
}

export default ProductMain