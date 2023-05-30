import { useState, useContext } from "react";
import { ShoppingContext } from "../../context";

const FormTemplate = ({node, open, openFunc, selectedData, icon: IconComponent, placeholder, dropdown, mobileName}) => {

  const {setShowSlideUp_mobile, setActivePopup_mobile} = useContext(ShoppingContext)

  const onClick = () => {
    openFunc((openBool) => !openBool);
    setShowSlideUp_mobile(true)
    setActivePopup_mobile(mobileName)
  }
    
  return (
    <div 
      className='flex flex-col h-full w-full justify-center items-center' 
      ref={node}
    >
        <label className="cursor-pointer text-neutralLight focus-within:text-neutralDark flex items-center w-full h-full">
            <IconComponent className={`w-8 h-8 absolute scale-125 ml-2 transform ${selectedData == '' ? 'text-neutralLight' : 'text-neutralDark'}`}
            onClick={onClick}
        />
            <div className={`bg-white cursor-pointer rounded-md mr-1 flex-1 overflow-hidden truncate focus-shadow-outline focus:outline-none placeholder-neutralLight pl-10 px-4 h-full items-center flex ${selectedData == '' ? 'text-neutralLight': 'text-neutralDark'}  border border-primary`} 
            onClick={onClick}
            >
                {selectedData == '' ? placeholder : selectedData}
            </div>
        </label>
        {open &&
          <div className="z-50 top-8 w-full justify-center items-center hidden ss:flex">
            {dropdown}
          </div>
        }
    </div>
  )
}

export default FormTemplate