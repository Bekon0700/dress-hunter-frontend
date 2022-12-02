import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import Loading from '../../components/layout/loading-overlay/Loading'
import useTitle from '../../hooks/useTitle'

const routeData = [
    {
        role: 'seller',
        route: 'my products',
    },
    {
        role: 'seller',
        route: 'add a product'
    },
    {
        role: 'buyer',
        route: 'my oders'
    },
    {
        role: 'admin',
        route: 'all sellers'
    },
    {
        role: 'admin',
        route: 'all buyers'
    },
]

const Dashboard = () => {
    useTitle('Dashboard')
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

    return (
        <div className='w-11/12 lg:w-4/5 mx-auto grid grid-cols-12 py-8 h-screen'>
            <div className='col-span-12 lg:col-span-2 flex flex-col gap-2 border-r'>
                <p className='text-lg font-semibold text-gray-800 uppercase border-b-2 border-gray-200 text-center pb-1'>{user.role}'s, Navigation</p>
                {
                    routeData.filter(el => el.role == user.role).map((el, id) => {
                        return (
                            <div key={id}>
                                <NavLink 
                                to={el.route.split(' ').join('-')}
                                className={({isActive}) => isActive ? 'text-base font-medium capitalize text-blue-700' : 'text-base font-medium capitalize'}
                                >{el.route}</NavLink>
                            </div>
                        )
                    })
                }
            </div>
            <div className='col-span-12 lg:col-span-10 px-4'>{<Outlet />}</div>
        </div>
    )
}

export default Dashboard