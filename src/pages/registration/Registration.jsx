import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import FormInput from '../../components/form-input/FormInput'
import { authContext } from '../../context/AuthProvider'


const formData = [
    {
        id: 1,
        name: 'username',
        placeholder: 'john doe',
        type: 'text'
    },
    {
        id: 2,
        name: 'email',
        placeholder: 'john@doe.com',
        type: 'text'
    },
    {
        id: 3,
        name: 'password',
        placeholder: 'password',
        type: 'password'
    },
]

const Registration = () => {
    const { userRegister, updateUser, userLogout } = useContext(authContext)
    
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const onSubmit = async (data) => {
        try {
            const res = await axios.post('https://dress-hunter-api.vercel.app/api/v1/users/', {
                userName: data.username,
                email: data.email,
                role: data.role
            })
            await userRegister(data.email, data.password)
            await updateUser({
                displayName: data.username,
            })
            await userLogout()
            toast.success('Your account has been created, please log in')
            reset()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='bg-white text-black dark:bg-gray-800  dark:text-gray-100'>
            <div className='w-11/12 mx-auto flex justify-center py-12 lg:py-16'>
                <div className="w-full max-w-md p-6 lg:p-8 space-y-3 rounded-xl text-gray-900 dark:text-gray-100 border border-gray-700">
                    <h1 className="text-2xl font-bold text-center">Register</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                        {
                            formData.map((el) =>
                                <div className='flex flex-col gap-1' key={el.id}>
                                    <label htmlFor={el.name} className="block text-gray-600 text-xs pl-2">{el.name}</label>
                                    <input id={el.name} placeholder={el.placeholder} type={el.type} {...register(`${el.name}`, {
                                        required: true,
                                    })} className='p-2 border rounded-md border-gray-700 w-full' />
                                </div>
                            )
                        }
                        <div className='flex flex-col gap-1' >
                            <label htmlFor='confirmPassword' className="block text-gray-600 text-xs pl-2">Confirm Password</label>
                            <input id='confirmPassword' placeholder='confirm password' type='password' {...register('confirmPassword', {
                                required: true,
                                validate: (val) => {
                                    if (watch('password') != val) {
                                        return "Your passwords do no match";
                                    }
                                },
                            })} className='p-2 border rounded-md border-gray-700 w-full' />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor='role' className="block text-gray-600 text-xs pl-2">Select user role: </label>
                            <select id='role' {...register("role")} className='p-2 border rounded-md'>
                                <option value="buyer">Buyer</option>
                                <option value="seller">Seller</option>
                            </select>
                        </div>
                        {errors.exampleRequired && <span>This field is required</span>}
                        <input type="submit" className='px-4 py-1 bg-gray-800 text-white cursor-pointer' />
                    </form>
                    <p className="text-sm text-center sm:px-6 font-semibold pt-3">Already have an account?
                        <Link to='/login' className="pl-1 underline text-blue-900 ">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Registration