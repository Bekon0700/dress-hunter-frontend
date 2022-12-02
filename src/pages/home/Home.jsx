import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import useTitle from '../../hooks/useTitle'
import Marquee from "react-fast-marquee";

import Loading from './../../components/layout/loading-overlay/Loading'
import HomeSlider from './../../components/slider/HomeSlider'
import { authContext } from '../../context/AuthProvider'
import GenericModal from '../../components/generic-modal/GenericModal'
import { PhotoProvider, PhotoView } from 'react-photo-view'
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const Home = () => {
  useTitle('Home')
  const { user } = useContext(authContext)
  const [modalStatus, setModalStatus] = useState(false)
  const [modalData, setModalData] = useState()
  const { data: categories = [], isLoading, refetch: categoryRefetch } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await axios.get('https://dress-hunter-api.vercel.app/api/v1/products/category')
      return res.data.categories
    },
    enabled: false
  })

  useEffect(() => {
    let cleaner = true
    if (cleaner) {
      categoryRefetch()
    }
    return () => {
      cleaner = false
    }
  }, [])


  const { data: advertisedProducts = [] } = useQuery({
    queryKey: ['advertisedProducts'],
    queryFn: async () => {
      const res = await axios.get('http://dress-hunter-api.vercel.app/api/v1/products/adverProducts')
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
    <div className='pb-8'>
      <HomeSlider />
      <div className='w-11/12 lg:w-3/4 mx-auto'>
        <Marquee speed={40} gradientWidth={0} className='text-gray-900 font-medium -z-20'>
          Black friday offer! Get 20% discount on all products
        </Marquee>
      </div>
      <div className='w-1/2 mx-auto py-16 flex flex-col gap-8'>
        <p className='text-xl font-medium text-center'>Roam our exciting products by categories</p>
        <div className='grid grid-cols-12 lg:grid-cols-3 gap-6'>
          {
            categories.map((el, id) => <div key={id} className='justify-self-center'>
              <Link to={`/categories/${el._id}`} className='px-8 py-2 bg-green-600 text-white text-center text-xl font-semibold hover:bg-fuchsia-400 '>{el._id}</Link>
            </div>)
          }
        </div>
      </div>
      {
        advertisedProducts.length > 0 &&
        <>
          <div className='w-1/2 mx-auto py-16 flex flex-col gap-12'>
            <p className='text-xl font-medium text-center'>Our special Products</p>
            <div className='flex flex-col gap-6'>
              {
                advertisedProducts.map((product, id) => {
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
        </>
      }
    </div>
  )
}

export default Home