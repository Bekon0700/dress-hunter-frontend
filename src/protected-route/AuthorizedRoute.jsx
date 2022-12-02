import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Loading from '../components/layout/loading-overlay/Loading'

const AuthorizedRoute = ({children, role}) => {
    const { data: user = [], isLoading } = useQuery({
        queryKey: ['single-user'],
        queryFn: async () => {
            const res = await axios.get(`https://dress-hunter-api.vercel.app/api/v1/users/single-user`, {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('jwtoken')
                }
            })
            return res.data.user
        }
    })

    if (isLoading) {
        return (
            <Loading />
        )
    }

    if(role != user.role){
        return(
            <div className='text-center text-xl font-bold text-red-700'>
                <p>You dont have the permission to go to this route</p>
            </div>
        )
    }
  return (
    <>{children}</>
  )
}

export default AuthorizedRoute