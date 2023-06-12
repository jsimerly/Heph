import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ConstructionIcon from '@mui/icons-material/Construction';
import { BlueButton } from "../../utils"
import navigateShopping from '../../../hooks/navigateShopping';
import navigateSearch from "../../../hooks/navigateSearch";
import SearchIcon from '@mui/icons-material/Search';
import { useContext } from "react";
import { ShoppingContext } from "../../../context";
import useClickOutside from "../../../hooks/useClickOutside";
import SlideUp from './SlideUp';

const MobileSearch = ({immediateSearch, searchInput, setSearchInput, searchParamActive, setSearchParamActive}) => {
  const {selectedCategory, selectedDateRange, selectedDestination, showSlideUp_mobile, setShowSlideUp_mobile, activePopup_mobile, setActivePopup_mobile} = useContext(ShoppingContext)


  let node = useClickOutside(()=> setShowSlideUp_mobile(false))

  let handleShopping= navigateShopping()
  let handleSearch = navigateSearch()   

  const handleGoClick = () =>{
    if (searchParamActive){
        handleSearch(searchInput)
        return
    } 
    handleShopping()
  }

  const handleLocationClicked = () => {
    setShowSlideUp_mobile(true)
    setActivePopup_mobile('where')
  }

  const handleCalendarClicked = () => {
    setShowSlideUp_mobile(true)
    setActivePopup_mobile('when')
  }

  const handleCategoriesClicked = () => {
    setShowSlideUp_mobile(true)
    setActivePopup_mobile('what')
  }

  let displayData = ''

  if (searchParamActive){
    displayData = searchInput
  } else if (selectedCategory) {
    displayData = selectedCategory.name
  } else {
    displayData = ''
  }





  return (
    <div className="relative">
      <div 
      ref={node}
      className={`fixed -bottom-[360px] left-0 w-full ss:hidden flex flex-col bg-white z-50
      transition-transform duration-300
      ${showSlideUp_mobile ?  '-translate-y-[360px]' : 'transform translate-y-0'}`}>
        <div className="text-neutralDark w-full border-t pr-2">
          <div className="flex flex-row">
            <div className='flex flex-row w-full'>
              <div 
                className={`flex flex-col justify-center items-center w-[20%] pt-2 pb-1  ${ selectedDestination ? 'text-neutralDark' : 'text-neutralLight'}
                ${ showSlideUp_mobile && activePopup_mobile === 'where' ? 'border-primary' : 'border-white'} border-t-2
                `}
                onClick={handleLocationClicked}
              >
                <LocationOnIcon sx={{fontSize: 30}}/>
                <span className='text-[10px]'>
                  Where
                </span>
              </div>
              <div 
                className={`flex flex-col justify-center items-center w-[20%] pt-2 pb-1 ${ selectedDateRange?.first ? 'text-neutralDark' : 'text-neutralLight'}
                ${ showSlideUp_mobile && activePopup_mobile === 'when' ? 'border-primary' : 'border-white'} border-t-2`}
                onClick={handleCalendarClicked}
              >
                <CalendarMonthIcon sx={{fontSize: 30}}/>
                <span className='text-[10px]'>
                  When
                </span>
              </div>
              <div 
                className={` flex flex-row items-center w-[60%] pt-2 pb-1 
                ${ displayData ? 'text-neutralDark' : 'text-neutralLight'}
                ${ showSlideUp_mobile && activePopup_mobile === 'what' ? 'border-primary' : 'border-white'} border-t-2
                `}
                onClick={handleCategoriesClicked}
              >
                <div className='w-[10%]'></div>
                <div className='flex flex-col items-center'>
                  <ConstructionIcon sx={{fontSize: 30}}/> 
                  <span className='ml-1 text-[10px]'>
                    What
                  </span>
                </div>
                <h3 className="ml-4 text-[16px] font-bold w-[70%] line-clamp-2">
                  {displayData ? displayData : 'Select a Category'}
                </h3>
              </div>
            </div>
            {!immediateSearch &&
              <div className='ml-2 pt-2 pb-1'>
                <BlueButton 
                  content={<SearchIcon sx={{fontSize: 30}}/>}
                  onClick={handleGoClick}
                />
              </div>
            }
          </div>
        </div>
        <SlideUp
          open={showSlideUp_mobile}
          setOpen={setShowSlideUp_mobile}
          activePopup={activePopup_mobile}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setSearchParamActive={setSearchParamActive}
        />
      </div>
    </div>
  )
}

export default MobileSearch
