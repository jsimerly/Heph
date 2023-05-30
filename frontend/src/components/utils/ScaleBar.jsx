import { useEffect, useState } from 'react'
import { Range } from 'react-range'
import { company } from '../../../constants/company_constants'

const ScaleBar = ({values, setValues, priceExtrema, setDisplayMax, setDisplayMin}) => {
  const [displayValues, setDisplayValues] = useState([0,100])

  useEffect(() => {
    const newValues = [
      values[0] === null ? priceExtrema[0] : values[0],
      values[1] === null ? priceExtrema[1] : values[1],
    ];
    setDisplayValues(newValues)
  }, [priceExtrema, values, setValues]);

  const handleOnChange = (values) => {
    setValues(values)
    setDisplayMin(values[0].toFixed(2))
    setDisplayMax(values[1].toFixed(2))
  }

    return (
        <div className='pb-8 px-2'>
          <Range
            values={displayValues}
            min={priceExtrema[0]}
            max={priceExtrema[1]}
            step={0.05}
            onChange={handleOnChange}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
              >
                <div
                  ref={props.ref}
                  className='rounded-md w-full h-[3px] cursor-pointer'
                  style={{
                    background: `linear-gradient(to right, ${company.neutral_light} 0%, ${company.neutral_light} ${
                      ((displayValues[0] - priceExtrema[0]) / (priceExtrema[1] - priceExtrema[0])) * 100
                    }%, ${company.secondary_color} ${
                      ((displayValues[0] - priceExtrema[0]) / (priceExtrema[1] - priceExtrema[0])) * 100
                    }%, ${company.secondary_color} ${
                      ((displayValues[1] - priceExtrema[0]) / (priceExtrema[1] - priceExtrema[0])) * 100
                    }%, ${company.neutral_light} ${
                      ((displayValues[1] - priceExtrema[0]) / (priceExtrema[1] - priceExtrema[0])) * 100
                    }%, ${company.neutral_light} 100%)`,
                  }}
                >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ props, index }) => (
              <div
                {...props}
                className='border-primary border-2 bg-white h-[16px] w-[16px] rounded-full shadow-md relative outline-none'
              >
                <div 
                    className='absolute -bottom-5 text-[10px] text-neutralDark'
                    style={{
                        transform: "translateX(-50%)",
                        left: "50%",
                      }}
                >
                    {displayValues[index].toFixed(0)}
                </div>
              </div>
            )}
          />
        </div>
      );
}

export default ScaleBar