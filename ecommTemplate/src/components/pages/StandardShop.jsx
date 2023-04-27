
import styles from '../../styles'

import { useContext, useEffect, useState } from "react";
import { BrowsingHistory, ItemSuggestion, ShoppingMain }  from '../shopping';

import ShoppingHero from '../shopping/ShoppingHero';
import { ShoppingContext } from '../../context';
import { fetchCategory  } from '../../api/fetchProducts';

const StandardShop = () => {
  const {selectedDateRange, selectedCategory, handleNotification, setSelectedCategory} = useContext(ShoppingContext)


  const [products, setProductData] = useState([])
  const [categoryInfo, setCategoryInfo] = useState()
  const [relatedCategories, setRelatedCategories] = useState([])
  const [filterData, setFilterData] = useState([])
  const [brands, setBrands] = useState([])

  useEffect(() => {
    const fetchCategoryInfo = async () => {
      //update to get the right data for the range
      if (selectedCategory){
        console.log(selectedCategory)
        const response = await fetchCategory(selectedCategory.fe_id, selectedDateRange.startDate, selectedDateRange.endDate, selectedDateRange.first)
        if (response.ok){
          const resp = await response.json()
          setCategoryInfo(resp)
          setProductData(resp['products'])
          setBrands(resp['brands'])
          setRelatedCategories(resp['related_categories'])
          setFilterData(resp['filter_options'])
        } else {
          handleNotification('Sorry, we appear to be having some technical difficulties. Please visit back once this has been updated.')
        }
      } else {
        console.log('here')
        setSelectedCategory({name:'All Categories', fe_id:'0000', parent:null, desc:"Planning your next vacation? Make sure you have everything you need with our selection of rental vacation items. From beach gear to kitchen essentials, we have everything to make your stay comfortable and convenient. All of our rental items are high-quality and well-maintained, so you can enjoy your vacation worry-free."
      })
      }

    }
    window.scrollTo(0,0)
    fetchCategoryInfo()
  },[selectedCategory, selectedDateRange])

  return (
    <div>
      <div className='text-tertiary'>
          <ShoppingHero
            categoryInfo={categoryInfo}
          />
        <div className={`${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <div className={`flex justify-between items-center w-full sm:mt-4`}>
              <div className='w-full px-3 sm:px-0'>
                <ShoppingMain
                  products={products}
                  relatedCategories={relatedCategories}
                  filterData={filterData}
                  brands={brands}
                />
              </div>
            </div>
            <div>
                <ItemSuggestion/>
                <BrowsingHistory/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StandardShop