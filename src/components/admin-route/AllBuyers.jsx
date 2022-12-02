import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'

const AllBuyers = () => {
  const { data: allbuyers = [], refetch } = useQuery({
    queryKey: ['allbuyers'],
    queryFn: async () => {
      const res = await axios.get(`https://dress-hunter-api.vercel.app/api/v1/users/`, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('jwtoken')
        }
      })
      return res.data.users
    }
  })

  const deleteBtn = async (id) => {
    try {
      const res = await axios.delete(`https://dress-hunter-api.vercel.app/api/v1/users/${id}`, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('jwtoken'),
          userId: id
        }
      })
      toast.success('Account deleted')
      refetch()
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>user name</th>
              <th>email</th>
              <th>Delete account</th>
            </tr>
          </thead>
          <tbody>
            {
              allbuyers.filter(el => el?.role == 'buyer').map((el, id) => {
                const { userName, email, _id} = el
                return (
                  <tr key={id}>
                    <th>{id + 1}</th>
                    <td>{userName}</td>
                    <td>{email}</td>
                    <td><button onClick={() => deleteBtn(_id)} className='px-3 py-1 bg-red-700 text-white rounded-sm w-7/12'>Delete</button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AllBuyers