import { useState, useContext, useEffect } from 'react';
import { ShoppingContext } from "../../context";
import navigateShopping from '../../hooks/navigateShopping'

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';

import { payment } from '../../assets/svg'
import { Where, When } from '../searchbar';
import { LargeBlueButton } from '../utils';
import { fetchPromoCode } from '../../api/fetchCart';

const PromoCard = ({promo, handlePromoRemove, }) => {
    const [showDescription, setShowDescription] = useState(false);
    
    const handleMouseEnter = () => {
        setShowDescription(true)
    }

    const handleMouseLeave = () => {
        setShowDescription(false)
    }

    const handleRemoveClicked = () => {
        handlePromoRemove(promo)
    }
 
    return (
        <div className='flex flex-row w-full justify-between items-center border my-1 rounded-md border-primary bg-primaryLight cursor-help relative'>
            <div
                className='flex flex-row w-full items-center'
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div 
                    className='text-[20px] ml-2 p-1'
                >
                    {promo.name}
                </div>
                <div className='flex-1 mx-2 text-[12px]'>
                    {showDescription && (
                        <div className="">
                            {promo.description}
                        </div>
                    )}
                </div>
            </div>
            <div 
                className='hover:scale-110 cursor-pointer p-1'
                onClick={handleRemoveClicked}
            >
                <CloseIcon/>
            </div>
        </div>
    )
}

const OrderSummary = ({subTotal, itemCount, insuranceTotal, setFreeItems, deleteFreeItem, activePromos, setActivePromos}) => {
    const {handleNotification} = useContext(ShoppingContext)
    let navigateContinueShopping = navigateShopping('')

    const [openPromos, setOpenPromos] = useState(false)
    const [promoCode, setPromoCode] = useState('')
    const [promoCodeError, setPromoCodeError] = useState()
    const [flatDiscounts, setFlatDiscounts] = useState([])
    const [percentDiscounts, setPercentDiscounts] = useState([])
    const [totalDiscount, setTotalDiscount] = useState(0)

    useEffect(()=>{
        let flat = []
        let percent = []
        activePromos.map((promo) => {
            if (promo.flat_discount !== "0.00"){
                flat.push(promo.flat_discount)
            }
            if (promo.percentage_discount !== '0.00'){
                percent.push(promo.percentage_discount)
            }

        })
        setFlatDiscounts(flat)
        setPercentDiscounts(percent)
    }, [activePromos])

    useEffect(()=>{
        getTotalDiscount(subTotal)
    }, [subTotal, flatDiscounts, percentDiscounts])

    const {selectedDestination, selectedDateRange} = useContext(ShoppingContext)

    const handleContinueShoppingClick = () => {
        navigateContinueShopping()
    }

    const handlePromoAdded = async (code) => {
        const response = await fetchPromoCode(code, selectedDateRange.startDate, selectedDateRange.endDate, selectedDateRange.first)
        
        if (response.ok){
            const resp = await response.json()        

            let newActives = activePromos
            const existingIndex = newActives.findIndex(promo => promo.uuid === resp.uuid)
    
            if (existingIndex === -1){
                newActives.push(resp)
                setActivePromos([...newActives])
            } else {
                handleNotification('You have already added that promotion.')
            }
            setOpenPromos(false)
            setPromoCodeError(null)
        } else if (response.status === 400){
            const resp = await response.json()
            setPromoCodeError(resp.error)
        }
    } 

    const handlePromoRemove = (removePromo) => {
        let newActives = activePromos
        const existingIndex = newActives.findIndex(promo => promo.uuid == removePromo.uuid)

        if (existingIndex !== -1){
            const freeItemsToRemove = newActives[existingIndex].free_items
            freeItemsToRemove.map((item) => {
                deleteFreeItem(item)
            })

            newActives.splice(existingIndex, 1)
            setActivePromos([...newActives])
        } else {
            handleNotification('We had an issue removing your promotion. Please refresh the page.')
        }
    }

    const handlePromoCodeChange = (e) => {
        setPromoCode(e.target.value.toUpperCase())
    }

    const getTax = (preTaxTotal) => {
        const taxRate = selectedDestination ? selectedDestination.taxRate : 0.07
        const total_taxes = preTaxTotal * ( taxRate )
        return Math.ceil(total_taxes * 100) / 100
    }

    const getTotal = (preTaxTotal) => {
        const afterDiscount = preTaxTotal - totalDiscount
        const taxes = getTax(afterDiscount)
        const total = taxes + afterDiscount
        return Math.ceil(total * 100) / 100
    }

    const getFlatDiscount = () => {
        let flatDiscount = 0
        flatDiscounts.map((discount) => {
            flatDiscount += discount
        })
       
        return flatDiscount
    }

    const getAfterPercentDiscount = () => {
        let percentAfterDiscount = 1
        percentDiscounts.map((discount) => {
            percentAfterDiscount = percentAfterDiscount * (1-discount)
        })

        return percentAfterDiscount
    }

    const getTotalDiscount = (subtotal) => {
        if (!subtotal){
            setTotalDiscount(0)
        }

        const flatDiscount = getFlatDiscount(subtotal)
        const percentAfterDiscount = getAfterPercentDiscount(subtotal)
        subtotal = (subtotal * (1 - percentAfterDiscount)) + flatDiscount

        setTotalDiscount(subtotal)
    }

  return (
    <div className='bg-white rounded-md w-full flex flex-col px-6 py-6'>
        <h3 className='font-bold'>Where and When</h3>
        <div className='relative'>
            <div className='flex flex-row space-x-1'>
                <div className='w-1/2 flex h-[40px] '><Where/></div>
                <div className='w-1/2 flex h-[40px] relative'><When/></div>
            </div>
        </div>
        <div className='mt-2'>
            <div className='flex flex-col items-start'>
                <div className='w-full flex justify-between'> 
                    <h3 className='font-bold'> Promos</h3> 
                    <div 
                        className='cursor-pointer group'
                        onClick={()=> setOpenPromos(!openPromos)}
                    >
                        <span className='text-[12px] group-hover:underline'> Add Code </span>
                        {openPromos ? 
                            <RemoveIcon className='scale-75 group-hover:scale-100'/>
                            :
                            <AddIcon className='scale-75 group-hover:scale-100'/>
                        }

                    </div>
                </div>
                <div className='w-full'>
                    {activePromos.map((promo, i) => (
                        <PromoCard
                            key={'promo_card_'+i}
                            promo={promo}
                            handlePromoRemove={handlePromoRemove}
                        />
                    ))}
                </div>
                <div className={`${openPromos ? '' : 'hidden'} flex flex-row w-1/2`}>
                    <input 
                        className='border border-primary p-1 pl-3 rounded-md outline-primary flex'
                        placeholder='PROMO CODE'
                        value={promoCode}
                        onChange={handlePromoCodeChange}
                    />
                    <div className='p-2 bg-primary rounded-md ml-1 cursor-pointer group'>
                        <AddIcon
                            onClick={()=> handlePromoAdded(promoCode)}
                            className='group-hover:scale-125 text-white'
                        />
                    </div>
                </div>
                {promoCodeError && 
                    <div className={`ml-1 mt-1 text-errorRed ${openPromos ? '' : 'hidden'}`}>
                        {promoCodeError}
                    </div>
                }

            </div>
        </div>
        <div className='mt-2'>
            <div className='flex flex-row justify-between'>
                <h3 className=''>Subtotal ({itemCount} items)</h3>
                <div>
                    <p> ${subTotal.toFixed(2)}</p>
                </div>
            </div>
        </div>
        {totalDiscount !== 0 ?
            <div className='mt-2'>
                <div className='flex flex-row justify-between'>
                    <h3 className=''>Discount</h3>
                    <div>
                        <p className='text-primary'> - ${totalDiscount.toFixed(2)}</p>
                    </div>
                </div>
            </div>
            : null
        }
        <div className='mt-2'>
            <div className='flex flex-row justify-between'>
                <h3 className=''>Insurance</h3>
                <div>
                    <p> ${insuranceTotal.toFixed(2)}</p>
                </div>
            </div>
        </div>
        <div className='mt-2'>
            <div className='flex flex-row justify-between'>
                <h3 className=''>Estimated Tax</h3>
                <div>
                    <p> ${getTax(insuranceTotal + subTotal).toFixed(2)}</p>
                </div>
            </div>
        </div>
        <div className='mt-2'>
            <div className='flex flex-row justify-between'>
                <h3 className='font-bold'>Total Cost</h3>
                <div className='font-bold'>
                    <p> ${getTotal(insuranceTotal + subTotal)}</p>
                </div>
            </div>
        </div>
        <div className='w-full flex justify-center items-center mt-4'>
            <LargeBlueButton
                content='Checkout'
            />
        </div>
        <div className='flex justify-center'>
            <div className='flex flex-row justify-center items-center space-x-1 my-2 w-2/3'>
                <img src={payment}/>
            </div>
        </div>
        <div 
            className='w-full flex justify-center items-center hover:underline cursor-pointer mt-2'
            onClick={handleContinueShoppingClick}
        >
            Continue Shopping
        </div>   
    </div>
  )
}

export default OrderSummary