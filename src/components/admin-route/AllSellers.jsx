import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext } from 'react'
import toast from 'react-hot-toast'
import { authContext } from '../../context/AuthProvider'

const AllSellers = () => {
  const { data: allSeller = [], refetch } = useQuery({
    queryKey: ['allSeller'],
    queryFn: async () => {
      const res = await axios.get(`https://dress-hunter-api.vercel.app/api/v1/users/`, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('jwtoken')
        }
      })
      return res.data.users
    }
  })

  const verifyBtn = async (id) => {
    try {
      const res = await axios.patch(`https://dress-hunter-api.vercel.app/api/v1/users/${id}`, {userId: id, verify: true}, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('jwtoken')
        }
      })
      toast.success('Status Updated')
      refetch()
    } catch (err) {
      console.log(err)
    }
  }
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
              <th>accountstatus</th>
              <th>Delete account</th>
              <th>verify account</th>
            </tr>
          </thead>
          <tbody>
            {
              allSeller.filter(el => el?.role == 'seller').map((el, id) => {
                const { userName, email, verified, _id} = el
                return (
                  <tr key={id}>
                    <th>{id + 1}</th>
                    <td>{userName}</td>
                    <td>{email}</td>
                    <td>{verified ? 'verified' : 'not verified'}</td>
                    <td><button onClick={() => deleteBtn(_id)} className='px-3 py-1 bg-red-700 text-white rounded-sm w-7/12'>Delete</button></td>
                    <td className='flex items-center gap-3'>
                      {
                        verified ?
                          <button className='px-3 py-1 bg-blue-700 text-white rounded-sm w-7/12'>Already verified</button>
                          :
                          <button onClick={() => verifyBtn(_id)} className='px-3 py-1 bg-green-600 text-white rounded-sm w-7/12'>Verifiy now</button>
                      }
                    </td>
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

export default AllSellers