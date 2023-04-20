import { useContext, useEffect, useState, useRef } from "react";
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { ShoppingContext } from "../../context";
import { fetchManyCategories } from "../../api/fetchProducts";

import FormTemplate from "./FormTemplate";
import useDropdown from "../../hooks/useDropdown";
import navigateSearch from "../../hooks/navigateSearch";

const What = ({searchInput, setSearchInput, searchParamActive, setSearchParamActive}) => {
    //add search ability to this at some point
    const {setSelectedCategory, selectedCategory} = useContext(ShoppingContext)
    const [open, setOpen, handleClick, node] = useDropdown()
    const [allCategories, setAllCategories] = useState()
    
    useEffect(()=> {
        const getAllCategory = async () => {
            const response = await fetchManyCategories('0000') 
            if (response.ok){
                const resp = await response.json()
                setAllCategories(resp)
            } 
        }
        getAllCategory()
    },[])

    const inputRef = useRef(null);

    useEffect(() => {
        if (open && inputRef.current) {
          inputRef.current.focus();
        }
      }, [open]);

    const handleSelect = (cat) => {
        setSelectedCategory(cat);
        setOpen(false);
        setSearchParamActive(false)
    }
    
    const getDisplayData = () => {

        if (searchParamActive){
            return searchInput
        }
        if (selectedCategory){
            return selectedCategory.name
        }
        return ''
    }

    const handleSearch = navigateSearch()

    const handleKeyDown = (e) =>{
        if (e.key === 'Enter'){
            e.preventDefault();
            handleSearch(searchInput)
        }
    }
    const dropdown = () => {
        return (
        <div 
            className={`sm:absolute bg-white flex w-full flex-col top-16 right-0 mx-4 rounded-md p-2 ${open ? '' : 'hidden'} shadow-md z-20 border border-primary sm:border-none overflow-y-auto `}
            style={{ maxHeight: `80vh` }}
        >
            <div className="relative">
                <form>
                    <input 
                        ref={inputRef}
                        className="p-2 rounded-md border border-primary w-full text-tertiary outline-primary"
                        placeholder="Search"
                        value={searchInput}
                        onChange={(e)=> {setSearchInput(e.target.value); setSearchParamActive(true)}}
                        onKeyDown={handleKeyDown}
                    />
                    <SearchIcon 
                        className="absolute -translate-y-1/2 top-1/2 right-2 scale-125 hover:scale-150 cursor-pointer"
                        onClick={()=>handleSearch(searchInput)}
                    />
                </form>
            </div>
            <h1 className='w-full text text-tertiary font-bold text-[22px] py-2'>
                Categories
            </h1>
            <div className='sm:flex sm:flex-wrap justify-start text-tertiary'>
                {allCategories && allCategories.subcategories.map((cat, i) => {
                    const [open, setOpen] = useState(false)

                    return(
                        <div key={i} className='mr-10 flex flex-col flex-1 sm:flex-none mb-3'>
                            <div className="flex flex-row justify-between">
                                <h3 
                                    className='font-bold text-[18px] px-2 cursor-pointer hover:underline'
                                    onClick={()=> {handleSelect(cat)}}
                                >
                                    {cat.name}
                                </h3>
                                {open ?
                                    <button
                                        key={'button_less_'+i} 
                                        className="sm:hidden"
                                        onClick={() => setOpen(false)}
                                    >
                                        <ExpandLessIcon/>
                                    </button>
                                    :
                                    <button 
                                        key={'button_more_'+i} 
                                        className="sm:hidden"
                                        onClick={() => setOpen(true)}
                                    >
                                        <ExpandMoreIcon/>
                                    </button>
                                }

                            </div>   
                            <ul className={`${open ? null : 'hidden sm:block'}`}>
                                {cat.subcategories?.map((subCat, i) => (
                                    <li 
                                        key={i}
                                        className='pl-4 cursor-pointer hover:underline truncate'
                                        onClick={()=> handleSelect(subCat)}
                                    >
                                        {subCat.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                })}
            </div>
            <h4 
                className='w-full text-center underline text-tertiary cursor-pointer hover:scale-105 mt-2'
                onClick={()=>handleSelect(allCategories)}
            >
                All Categories
            </h4>
        </div>
        )
    }

  return (
    <FormTemplate
        node={node}
        openFunc={setOpen}
        selectedData={getDisplayData()}
        dropdown={dropdown}
        placeholder={'What'}
        icon={BeachAccessIcon}
    />
  ) 
}

export default What