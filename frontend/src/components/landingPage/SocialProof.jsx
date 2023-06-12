import { socialProof } from "../../../constants/pages/landingCopy_constant"
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useEffect, useState } from 'react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const SocialCard = ({name, review, location, pic, init, bg_color}) => {
    const cardStyle = {
      backgroundColor: bg_color
    }
    return (
        <div className="h-[485px] w-[300px] ss:h-[300px] ss:w-[485px] flex ss:flex-row flex-col justify-between rounded-md shadow-md border-primary p-6 bg-white">
          <FormatQuoteIcon sx={{fontSize: 60}} className="text-secondary"/>
          <div className="flex flex-col h-full justify-between">
            <div className="mt-4">
              {review}"
            </div>
            <div className="flex flex-row items-center">
              <div 
                className={`border h-[70px] w-[70px] rounded-full justify-center items-center flex text-[30px] text-primary font-bold `}
                style={cardStyle}
              >
                {init}
              </div>
              <div className="flex flex-col leading-[20px] text-primary ml-3">
                <span className="text-[20px] font-bold">{name}</span>
                <span className="text-[16px]">{location}</span>
              </div>
            </div>
          </div>

        </div>
    )
}

const SocialProof = () => {

  const swiperRef = useRef(null)
  const [isMdPlus, setIsMdPlus] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMdPlus(window.innerWidth >= 768); // Adjust the breakpoint as needed
    };
  
    handleResize(); // Initial call to set the initial state
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
        <h3 className="text-[24px] ss:text-[40px] font-bold text-primary w-full text-center">
            {socialProof.header}
        </h3>
        <Swiper
            ref={swiperRef}
            spaceBetween={0} // Adjust space between slides
            slidesPerView={'auto'} // Adjust number of slides per view
            slidesPerGroup={1}
            navigation={isMdPlus}
            className="pl-3 py-6 ss:pl-16 custom-swiper"
            
        >
          {socialProof.cards.map((data, index) => (
            <SwiperSlide className="inline-flex w-auto mr-[3%]" key={index}>
              <SocialCard 
                name={data.name} 
                review={data.text} 
                location={data.location}
                init={data.initials}
                bg_color={data.bg_color}
              />
            </SwiperSlide>
          ))}
        </Swiper>
    </div>
  )
}

export default SocialProof