
import styles from '../../styles'

import { useContext, useEffect, useState } from "react";
import { BrowsingHistory, ItemSuggestion, ShoppingMain }  from '../shopping';

import ShoppingHero from '../shopping/ShoppingHero';
import { ShoppingContext } from '../../context';
import { fetchCategory  } from '../../api/fetchProducts';
import { defaultCategory } from '../../../constants/pages/shopping_constant';

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
        setSelectedCategory(defaultCategory)
      }
    }
    window.scrollTo(0,0)
    fetchCategoryInfo()
  },[selectedCategory, selectedDateRange])

  return (
    <div>
      <div className='text-neutralDark'>
          <ShoppingHero
            categoryInfo={categoryInfo}
          />
        <div className={`${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <div className={`flex justify-between items-center w-full sm:mt-4`}>
              <div className='w-full px-2 sm:px-3 '>
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