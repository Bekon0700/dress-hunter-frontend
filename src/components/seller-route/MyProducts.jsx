import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Loading from '../layout/loading-overlay/Loading'
import TableRow from '../table-row/TableRow'

const MyProducts = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products-seller'],
    queryFn: async () => {
      const res = await axios.get(`https://dress-hunter-api.vercel.app/api/v1/users/myProducts`, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('jwtoken')
        }
      })
      return res.data.products
    }
  })

  const btnHandler = async (id) => {
    console.log(id)
    try {
      const res = await axios.patch(`https://dress-hunter-api.vercel.app/api/v1/products/advertise`,{
        id
      }, 
      {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('jwtoken')
        }
      })
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }


  if (isLoading) {
    return (
      <Loading />
    )
  }
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Availability</th>
              <th>price</th>
              <th>Advertise</th>
            </tr>
          </thead>
          <tbody>
            {
              products.map((el, id) => <TableRow key={id} product={el} id={id} btnHandler={btnHandler} />)
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyProducts