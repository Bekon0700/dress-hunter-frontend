import axios from 'axios'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { authContext } from '../../context/AuthProvider'

const GenericModal = ({ modalData, setModalStatus, refetch }) => {
    const { productName, category, resalePrice, sellerId, _id } = modalData
    const { user } = useContext(authContext)

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const { buyerPhoneNumber, meetingLocation } = data
        const token = localStorage.getItem('jwtoken')
        const booking = {
            buyerPhoneNumber,
            meetingLocation,
            sellerId: sellerId._id,
            productId: _id,
        }

        try {
            const res = await axios.post('https://dress-hunter-api.vercel.app/api/v1/booking', booking, {
                headers: {
                    authorization: 'Bearer ' + token
                }
            })
            if (res.data.status == 'success') {
                toast.success('Booking added successfully!')
                setModalStatus(false)
                refetch()
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box flex flex-col gap-6">
                    <div className='flex justify-between items-center'>
                        <p className='text-base font-medium'>Book your product</p>
                        <label htmlFor="my-modal" className="bg-red-700 text-white px-2 py-1 rounded-md text-sm font-bold">X</label>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                        <p className='text-base font-semibold text-gray-400'>Buyer Info</p>
                        <input value={user?.displayName || ''} disabled className='bg-gray-300 py-1 px-2 rounded-sm' />
                        <input value={user?.email || ''} disabled className='bg-gray-300 py-1 px-2 rounded-sm' />
                        <input placeholder='phone number' type='text' {...register('buyerPhoneNumber')} className='bg-gray-300 py-1 px-2 rounded-sm' />
                        <input placeholder='meeting location' type='text' {...register('meetingLocation')} className='bg-gray-300 py-1 px-2 rounded-sm' />

                        <p className='text-base font-semibold text-pink-400 mt-2'>Product Info</p>
                        <input value={productName || ''} disabled className='bg-gray-300 py-1 px-2 rounded-sm' />
                        <input value={`${category} category` || ''} disabled className='bg-gray-300 py-1 px-2 rounded-sm' />
                        <input value={`${resalePrice} taka` || ''} disabled className='bg-gray-300 py-1 px-2 rounded-sm' />

                        <p className='text-base font-semibold text-gray-400'>Seller Info</p>
                        <input value={sellerId.userName} disabled className='bg-gray-300 py-1 px-2 rounded-sm' />
                        <input value={sellerId.email} disabled className='bg-gray-300 py-1 px-2 rounded-sm' />

                        {errors.exampleRequired && <span>This field is required</span>}
                        <input type="submit" className='px-4 py-1 bg-gray-800 text-white cursor-pointer' />
                    </form>
                </div>
            </div>
        </>
    )
}

export default GenericModal