import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useTitle from '../../hooks/useTitle'

import { MdVerifiedUser } from 'react-icons/md'

import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import Loading from '../layout/loading-overlay/Loading'
import GenericModal from '../generic-modal/GenericModal'
import { authContext } from '../../context/AuthProvider'

const options = { year: 'numeric', month: 'long', day: 'numeric' };

const Categories = () => {
    const { user } = useContext(authContext)
    const { name } = useParams()
    const [modalStatus, setModalStatus] = useState(false)
    const [modalData, setModalData] = useState()
    useTitle(`${name} | category`)
    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products', name],
        queryFn: async () => {
            const res = await axios.get(`https://dress-hunter-api.vercel.app/api/v1/products/category/${name}`)
            return res.data.products
        }
    })

    const { data: userDB = [] } = useQuery({
        queryKey: ['single-user'],
        queryFn: async () => {
            const res = await axios.get(`https://dress-hunter-api.vercel.app/api/v1/users/single-user`, {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('jwtoken')
                }
            })
            return res.data.user
        },
        enabled: user ? true : false
    })

    const { data: myOders = [], refetch } = useQuery({
        queryKey: ['myOders'],
        queryFn: async () => {
            const res = await axios.get(`https://dress-hunter-api.vercel.app/api/v1/users/myOders`, {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('jwtoken')
                }
            })
            return res.data.oders
        },
        enabled: false
    })

    // console.log(myOders)

    const modalHandler = (isBooked, product) => {
        setModalData(product)
        setModalStatus(!isBooked && true)
    }


    const imgUrl = 'https://media.istockphoto.com/id/1339542140/photo/denim-jeans-on-store-shelves.jpg?b=1&s=170667a&w=0&k=20&c=RD_einV827MuTqYeQZ1f6apWu7GMf4AmUCJRqwlJnrU='
    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <div className='w-4/5 lg:w-4/6 mx-auto h-screen py-8'>
            <div className='flex flex-col gap-6'>
                {
                    products.map((product, id) => {
                        const { sellerId } = product
                        const alreadyBooked = myOders.find(el => el?.productId?._id == product._id)
                        return (
                            <div key={id} className='grid grid-cols-12 gap-6'>
                                <div className='col-span-12 lg:col-span-3'>
                                    <PhotoProvider>
                                        <PhotoView src={imgUrl}>
                                            <img src={product?.img || imgUrl} alt="" className='w-full h-56 rounded-sm' />
                                        </PhotoView>
                                    </PhotoProvider>
                                </div>
                                <div className='col-span-12 lg:col-span-4 flex flex-col justify-between'>
                                    <div>
                                        <p className='text-2xl font-medium flex gap-2 items-center'>{product.productName}</p>
                                        <p className='text-xm text-gray-500'>{product.category}</p>
                                    </div>
                                    <p className='text-base font-medium capitalize'>condition: {product.conditionType}</p>
                                    <p className='text-base font-medium capitalize'>location: {product.location}</p>
                                    <p className='text-base font-medium capitalize'>used: {product.usedTime}</p>
                                    <p className='tex-xs text-gray-700 capitalize'>{new Date(product.createdAt).toLocaleDateString('en-US', options)}</p>
                                </div>
                                <div className='col-span-12 lg:col-span-3 flex flex-col gap-3'>
                                    <p className='text-xl font-medium flex gap-2 items-center'>{sellerId.userName} {sellerId.verified && <MdVerifiedUser className='text-base' />}</p>
                                    <p className='text-base font-normal'>{sellerId.email}</p>
                                    <p className='text-base font-normal'>phone: {product.contactNumber}</p>
                                </div>
                                <div className='col-span-12 lg:col-span-2 flex flex-col gap-3'>
                                    <p className='text-lg text-green-800 font-semibold'>Resale price: {product.resalePrice}</p>
                                    <p className='text-sm font-normal text-gray-500'>Original price: {product.originalPrice}</p>
                                    {
                                        user ?
                                            <>
                                                {
                                                    userDB?.role != 'seller' ?
                                                    <label htmlFor="my-modal" onClick={() => modalHandler(alreadyBooked, product)}
                                                className={alreadyBooked ?
                                                    'bg-green-600 py-2 text-sm lg:text-sm mt-4 uppercase font-medium text-white w-full rounded-sm text-center cursor-none'
                                                    :
                                                    'bg-blue-800 py-2 text-sm lg:text-sm mt-4 uppercase font-medium text-white w-full rounded-sm text-center cursor-pointer'}>{alreadyBooked ? 'Already Booked' : 'Book Now'}</label>
                                                    :
                                                    <div className='bg-gray-800 py-2 text-sm lg:text-sm mt-4 uppercase font-medium text-white w-full rounded-sm text-center cursor-not-allowed'>seller cannot book</div>
                                                }
                                            </>
                                            :
                                            <Link to='/login' state={{ from: `${location.pathname}` }} className='bg-gray-800 py-2 text-sm lg:text-sm mt-4 uppercase font-medium text-white w-full rounded-sm text-center cursor-pointer'>Login to book</Link>

                                    }
                                </div>
                                {modalStatus && <GenericModal modalData={modalData} setModalStatus={setModalStatus} refetch={refetch} />}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Categories