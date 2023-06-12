import { fetchManyCategories } from "../../api/fetchProducts";
import { ShoppingContext } from "../../context";
import { useContext, useEffect, useState, useRef } from "react";
import navigateSearch from "../../hooks/navigateSearch";
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const WhatDropdown = ({searchInput, setSearchInput, setSearchParamActive, open, setOpen, mobile=false}) => {
  const {setSelectedCategory} = useContext(ShoppingContext)
  const [allCategories, setAllCategories] = useState()
  const [openCats, setOpenCats] = useState([])

  useEffect(()=> {
    const getAllCategory = async () => {
        const response = await fetchManyCategories('0000') 
        if (response.ok){
            const resp = await response.json()
            setAllCategories(resp)
            setOpenCats(new Array(resp.subcategories.length).fill(false))
        } 
    }
    getAllCategory()
    },[])

    const inputRef = useRef(null);

    useEffect(() => {
        if (open && inputRef.current && !mobile) {
          inputRef.current.focus();
        }
      }, [open]);

    const handleSelect = (cat) => {
      setSelectedCategory(cat);
      setOpen(false);
      setSearchParamActive(false)
  }

    const handleSearch = navigateSearch()

    const handleKeyDown = (e) =>{
        if (e.key === 'Enter'){
            e.preventDefault();
            handleSearch(searchInput)
            setOpen(false)
        }
    }

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value)
        setSearchParamActive(true)
    }

    console.log(openCats)

  return (
    <div 
        className={`ss:absolute bg-white flex w-full flex-col top-16 right-0 ss:rounded-md p-3 ${open ? '' : 'hidden'} ss:shadow-md z-20 overflow-y-auto  h-full ss:h-auto rel pb-6 ss:pb-2`}
    >
        <div className="relative">
            <form>
                <input 
                    ref={inputRef}
                    className="p-2 rounded-md border border-primary w-full text-neutralDark outline-primary"
                    placeholder="Search"
                    value={searchInput}
                    onChange={handleSearchInput}
                    onKeyDown={handleKeyDown}
                />
                <SearchIcon 
                    className="absolute -translate-y-1/2 top-1/2 right-2 scale-125 hover:scale-150 cursor-pointer"
                    onClick={()=>handleSearch(searchInput)}
                />
            </form>
        </div>
        <h1 className='w-full text text-neutralDark font-bold text-[22px] py-2'>
            Categories
        </h1>
        <div className='ss:flex ss:flex-wrap justify-start text-neutralDark'>
            {allCategories && allCategories.subcategories.map((cat, i) => {
                return(
                    <div key={i} className='mr-10 flex flex-col flex-1 ss:flex-none mb-3'>
                        <div className="flex flex-row justify-between">
                            <h3 
                                className='font-bold text-[18px] px-2 cursor-pointer hover:underline'
                                onClick={()=> {handleSelect(cat)}}
                            >
                                {cat.name}
                            </h3>
                            {openCats[i] ?
                                <button
                                    key={'button_less_'+i} 
                                    className="ss:hidden"
                                    onClick={() => {
                                      const newOpenCats = [...openCats];
                                      newOpenCats[i] = false;
                                      setOpenCats(newOpenCats);
                                    }}
                                >
                                    <ExpandLessIcon/>
                                </button>
                                :
                                <button 
                                    key={'button_more_'+i} 
                                    className="ss:hidden"
                                    onClick={() => {
                                      const newOpenCats = [...openCats];
                                      newOpenCats[i] = true;
                                      setOpenCats(newOpenCats);
                                    }}
                                >
                                    <ExpandMoreIcon/>
                                </button>
                            }

                        </div>   
                        <ul className={`${openCats[i] ? 'hidden ss:block' : null}`}>
                            {cat.subcategories?.map((subCat, i) => (
                                <li 
                                    key={i}
                                    className='pl-3 cursor-pointer hover:underline truncate'
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
            className='fixed ss:static bottom-3 w-full mt-2 flex justify-center'
            onClick={()=>handleSelect(allCategories)}
        >
            <a className="text-center underline text-neutralDark cursor-pointer ">All Categories</a>
        </h4>
    </div>
        
  )
}

export default WhatDropdown