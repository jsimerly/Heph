import CarouselTemplate from "./CarouselTemplate"
import { SmallCard } from "../shopping"
import { fetchAllFavorited, fetchBrowseHistory} from '../../api/fetchCart';

import { useContext, useEffect, useState } from 'react';
import { ShoppingContext } from '../../context';

const header = (
  <div className='flex justify-center sm:justify-start items-center relative text-[24px] text-center font-bold text-neutralDark p-2 mt-8'>
  Your Browsing History
</div>
)

const BrowsingHistory = ({addExtraFunction}) => {
  const {selectedDateRange} = useContext(ShoppingContext)
  const [browsingHistory, setBrowsingHistory] = useState([])

  useEffect(()=>{
    fetchBrowseHistory(setBrowsingHistory, selectedDateRange.startDate, selectedDateRange.endDate, selectedDateRange.first)
  },[selectedDateRange])

  if (browsingHistory.length === 0) {
    return null; 
  }

  return (
    <div className="p-2">
      <CarouselTemplate
        Card={SmallCard}
        addExtraFunction={addExtraFunction}
        cardData={browsingHistory}
        header={header}
      />
    </div>
  )
}

export default BrowsingHistory