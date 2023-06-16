import { useEffect, useState, useContext } from 'react';
import 'swiper/swiper-bundle.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper/core';

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
import GoToCart from '../cardsAndCarousels/GoToCart';

SwiperCore.use([Pagination]);

const ImageSlider = ({ mainCardInfo }) => {
    return (
      <div className="w-full p-3 rounded-md">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="bg-white rounded-md aspect-square shadow-sm"
        >
          {mainCardInfo && mainCardInfo.imgList.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image.image} className="w-full h-full object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  };

const MobileProductMain = ({mainCardInfo}) => {
    const [quant, setQuant] = useState(1)
    const [insured, setInsured] = useState(false)
    const [itemFavorited, setFavorited] = useState(false)
    const {setCartSize, handleNotification} = useContext(ShoppingContext)

    useEffect(()=>{
      if(mainCardInfo){
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

        <div className="flex flex-col">
          <div className="flex flex-col">
            <h1 className='text-neutralDark my-2 ml-6 flex flex-row'>
                {mainCardInfo && 
                <div className='flex flex-col w-full'>
                    <h1 className='text-[30px] font-bold leading-none'>
                    {mainCardInfo.name}
                    </h1>
                    <h2 className='text-[20px] '>
                    {mainCardInfo.brand}
                    </h2>
                </div>}
                <div 
                    className='pl-3 pr-6'
                    onClick={handleFavoriteClicked}
                >
                    {itemFavorited ? 
                    <FavoriteIcon className={`text-secondary`} sx={{fontSize: 30}}/>
                    :
                    <FavoriteBorderIcon className={`text-secondary`} sx={{fontSize: 30}}/>
                    }
                </div>
            </h1>
            <div className='flex'>
                <ImageSlider mainCardInfo={mainCardInfo}/>
            </div>
          </div>
          <div className="w-full flex flex-col items-center text-neutralDark p-6">
            <div className='flex flex-row justify-between w-full'>
                {mainCardInfo &&
                    <div className='text-center'>
                        
                        <h3 className='text-[36px] leading-none font-bold'>
                            ${mainCardInfo.price.toFixed(2)}
                        </h3>


                        <p className='leading-none'>
                        For {mainCardInfo.days} days
                        </p>
                    </div>
                }
                {mainCardInfo && mainCardInfo.nRatings !== 0 &&
                    <div className='text-secondary'>
                      <Stars rating={mainCardInfo.rating} size='30px' />
                    <span className='ml-2 text-neutralDark'>
                        ({mainCardInfo.nRatings})
                    </span>
                    </div>
                }
            </div>
            {mainCardInfo && mainCardInfo.insurance !== null &&
              <div className='w-full mt-3'>
                <div className='inline-flex grow-0 cursor-pointer group items-center'
                  onClick={handleInsuredClicked}
                >
                  {insured ? 
                  <VerifiedUserIcon
                    sx={{fontSize: '35px'}}
                    className='text-secondary group-hover:scale-110'
                  /> 
                  : 
                  <ShieldOutlinedIcon
                    sx={{fontSize: '35px'}}
                    className='text-secondary group-hover:scale-110'
                  />}
                  {mainCardInfo && 
                    <div className='text-[20px] ml-2 group-hover:underline'>
                      Insure for <span className='font-bold'> ${mainCardInfo.insurance.toFixed(2)}</span>
                    </div>
                  }
                </div>
              </div>
            }
            
            {mainCardInfo && 
              <div className='w-full flex flex-col justify-start mt-3 sm:'>
                <div>
                  <h3 className='font-semibold text-[16px]'>
                    Producer Description
                  </h3>
                  <p>
                    {mainCardInfo.desc}
                  </p>
                  <ul className='pt-6'>
                  {mainCardInfo && mainCardInfo.keyAttributes.map((bullet, i) => (
                    <li key={i}>
                      <span className='font-bold'>{bullet.att_name}:</span> {bullet.att_stat}
                    </li>
                    ))}
                  </ul>
                </div>
              </div>
            }
            <div className='flex flex-row w-full mt-6 p-2'>
              <div className='w-2/5'>
                <QuantInput
                  quant={quant}
                  setQuant={setQuant}
                />
              </div>
              <div className='w-full mx-4'>
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

  )
}

export default MobileProductMain