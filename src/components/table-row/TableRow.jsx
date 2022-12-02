import axios from 'axios'
import React from 'react'

const TableRow = ({ product, id, btnHandler }) => {
    const { resalePrice, sold, isAdvetised, productName, _id } = product
    
    return (
        <>
            <tr>
                <th>{id + 1}</th>
                <td>{productName}</td>
                <td className='font-semibold text-lime-600'>{sold ? 'Sold' : 'Available'}</td>
                <td>{resalePrice}</td>
                <td className='flex items-center gap-3'>
                    {
                        isAdvetised ?
                            <button className='px-3 py-1 bg-green-600 text-white rounded-sm w-1/2'>Already Advertised</button>
                            :
                            <button onClick={() => btnHandler(_id)} className='px-3 py-1 bg-red-800 text-white rounded-sm w-1/2'>Click to Advertise</button>
                    }
                </td>
            </tr>

        </>
    )
}




export default TableRow