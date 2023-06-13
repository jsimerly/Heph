import React from 'react'

const AdditionalInformation = ({categoryRank, rankLink, brand, msrp, manufactured, sku, rating}) => {
  return (
    <div className='flex w-full justify-center'>
        <table className='table-fixed w-full border border-white rounded-md'>
            <tbody>
                <tr className='bg-white'>
                    <td>Brand</td><td>{brand}</td>
                </tr>
                <tr >
                    <td>Manufactured</td><td>{manufactured}</td>
                </tr>
                <tr className='bg-white'>
                    <td>Product ID</td><td>{sku}</td>
                </tr>
                <tr>
                    <td>Average Rating</td><td>{rating}</td>
                </tr>
                <tr className='bg-white'>
                    <td>Ranking</td><td>{categoryRank}</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default AdditionalInformation