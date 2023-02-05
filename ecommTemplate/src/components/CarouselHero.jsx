import CaroProdCard from './CaroProdCard';
import { useState, useEffect } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useSwipeable } from 'react-swipeable'

const list = ['A', 'B', 'C', 'D', 'E', 'F', 'G', '1', '2','3', '4', '5', '6', '7', '8', '9']

const CarouselHero = () => {
  const [cardn, setCardn] = useState(0)
  const [translateString, setTranslate] = useState('translateX(0px)')

  const scrollN = 3
  const nCardsPerView = 3
  const scrollWidth = 316

  function leftButtonClick(){
    if (cardn <= 0) {
      setCardn(0)
      return
    }
    setCardn(cardn-1)
    translateXWidth(cardn-1)
  }

  function rightButtonClick(){
    if ((cardn+1)*scrollN >= list.length){
      return
    }
    setCardn(cardn+1)
    translateXWidth(cardn+1)
  }


  const handlers = useSwipeable({
    onSwipedLeft: () => rightButtonClick(),
    onSwipedRight: () => leftButtonClick(),
  });




  function translateXWidth(n){
    if ((n+1)*scrollN >= list.length && list.length%scrollN != 0){

      let remainingItems = list.length%scrollN

      let suffix = Math.round(((n-1) * scrollWidth * scrollN) + (scrollWidth * remainingItems)).toString() + 'px)'

      setTranslate('translateX(-' + suffix)
      console.log(suffix)
      return
    }

    let suffix = Math.round(n * scrollWidth * scrollN).toString() + 'px)'

    console.log(suffix)
    setTranslate('translateX(-' + suffix)
    return
  }

  return (
    <div className='bg-white rounded-md shadow-md flex flex-col md:flex-row'>
      <div className='flex justify-center items-center py-4 px-10 ml-4 relative text-[36px] text-center font-bold text-primary'>
        TOP SELLERS
      </div>
      
      <div 
        {...handlers}
        className='overflow-hidden flex flex-row relative'>
        <button 
        className={`text-white bg-primary rounded-md absolute top-1/2 z-10 mx-1 ${cardn === 0 ? 'hidden' : ''} p-2 bg-opacity-20 hover:bg-opacity-50`}
        onClick={()=> leftButtonClick()}
        >
          <ArrowBackIosNewIcon/>
        </button>
        <div 
          className={`flex transform transition ease-linear duration-300`}
          style={{ transform: translateString}}
          >
          {list.map((item, index) => {
            return (
              <CaroProdCard food={item} key={index}/>
            )
          })}
        </div>
        <button 
        className={`text-white bg-primary rounded-md absolute top-1/2 right-0 z-10 mx-1 p-2 bg-opacity-20 hover:bg-opacity-50 ${(cardn+1)*nCardsPerView >= list.length ? 'hidden' : ''}`}
        onClick={() => rightButtonClick()}
        >
          <ArrowForwardIosIcon/>
        </button>
      </div>
    </div>


  )
}

export default CarouselHero