import { useState, useEffect,} from "react"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Empty from "../utils/Empty";
import ErrorBoundry from "../utils/ErrorBoundry";

const CarouselTemplate = ({Card, cardData, cardW, header, scrollNFunc, addExtraFunction }) => {

  const [translateDistance, setTranslateDistance] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(null)
  const [nCardsPerView, setNCardsPerView] = useState(scrollNFunc)
  const cardWidth = cardW + 20
  const maxLength =  (cardData.length) * cardWidth - 1280

  function handleTranslate(newPosition){
    if (newPosition > 0) {
      if (newPosition < maxLength){
        setTranslateDistance(newPosition)
      } else {
        setTranslateDistance(maxLength)
      }
    } else {
      setTranslateDistance(0)
    }
  }

  const handleMouseDown = (e) => {
    setStartX(e.touches[0].clientX)
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.touches[0].clientX - startX
      if (deltaX > 0){
        handleTranslate(translateDistance-1)
      } else {
        handleTranslate(translateDistance+1)
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  function leftButtonClick(){
    const deltaX = nCardsPerView * cardWidth
    handleTranslate(translateDistance-deltaX)
  }

  function rightButtonClick(){
    const deltaX = nCardsPerView * cardWidth
    handleTranslate(translateDistance+deltaX)
  }

  useEffect(() => {
    let handleWindowResize = () => {
      let n = scrollNFunc()
      setNCardsPerView(n)
    }
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener('resize', handleWindowResize);
  }, [])

  return (
    <ErrorBoundry fallback="Oops, Sorry! We appear to be missing something.">

    <div className='flex flex-col'>
      {header}
      <div 
        
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        className='overflow-hidden flex flex-row relative p-4 sm:rounded-md'
        >
        <button 
        className={`text-white bg-primary rounded-md absolute top-1/2 z-10 ${translateDistance === 0 ? 'sm:hidden' : 'sm:block'} p-2 bg-opacity-20 hover:bg-opacity-50 hidden`}
        onClick={leftButtonClick}
        >
          <ArrowBackIosNewIcon/>
        </button>
        <div 
          className={`flex transform transition ease-linear duration-300 w-full min-h-[260px]`}
          style={{ transform: 'translateX(-'+translateDistance+'px)'}}
          >
          {cardData.length === 0 ? 
            <Empty/>
            :
            cardData.map((data, index) => {
              return (
                <Card
                  key={index}
                  item={data}
                  addExtraFunction={addExtraFunction}
                />
                )
              })
            }
        </div>
        <button 
        className={`text-white bg-primary rounded-md absolute top-1/2 right-0 z-10 mx-1 p-2 bg-opacity-20 hover:bg-opacity-50 ${translateDistance >= maxLength ? 'sm:hidden' : 'sm:block'} hidden`}
        onClick={rightButtonClick}
        >
          <ArrowForwardIosIcon/>
        </button>
      </div>
    </div>
    </ErrorBoundry>
  )
}

export default CarouselTemplate