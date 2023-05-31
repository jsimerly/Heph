import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './dateRangeStyles.css'
import {useEffect, useState, useContext } from "react";
import { ShoppingContext } from "../../context";

const WhenDropdown = ({setOpen}) => {
    const {setSelectedDateRange, selectedDateRange,} = useContext(ShoppingContext)
    const [dateRangeHolder, setDateRangeHolder] = useState(selectedDateRange)
    const [focusedRangeHolder, setFocusedRange] = useState([0,1])

    const handleRangeChange = (focusedRange) => {
        setFocusedRange(focusedRange)

    }

    function handleDateSelection(ranges){
        const { selection } = ranges;
        selection.first = true;
        setDateRangeHolder(selection)
    }

    useEffect(()=>{
        if (focusedRangeHolder[1] == 0){
            setSelectedDateRange(dateRangeHolder)
            setOpen(false)
        }
    },[dateRangeHolder])
    
  return (
    <div 
        className={`w-full ss:w-auto ss:absolute z-10 top-16 ss:rounded-md ss:shadow-md justify-center flex`}
    >
        <DateRange
            ranges={[dateRangeHolder]}
            showMonthAndYearPickers={false}
            onChange={handleDateSelection}
            minDate={new Date()}
            startDatePlaceholder='Beginning'
            endDatePlaceholder='Finale'
            className={`ss:rounded-md ss:shadow-md`}
            onRangeFocusChange={handleRangeChange}
            rangeColors={["#e03400", "#2b2b2a", "#2b2b2a"]}
        />
    </div>
  )
}

export default WhenDropdown