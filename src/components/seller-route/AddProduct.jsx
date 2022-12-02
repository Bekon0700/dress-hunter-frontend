import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const formData = [
  {
    name: 'productName',
    type: 'text'
  },
  {
    name: 'contactNumber',
    type: 'text'
  },
  {
    name: 'originalPrice',
    type: 'text'
  },
  {
    name: 'resalePrice',
    type: 'text'
  },
  {
    name: 'location',
    type: 'text'
  },
  {
    name: 'usedTime',
    type: 'text'
  },
  {
    name: 'image',
    type: 'file'
  },
]

const AddProduct = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const onSubmit = async (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append('image', image);
    const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_key}`
    fetch(url, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(async imgData => {
        const { status } = imgData
        if (status == 200) {
          const imgURL = imgData.data.display_url
          const sellInfo = {
            ...data,
            originalPrice: data.originalPrice * 1,
            resalePrice: data.resalePrice * 1,
            img: imgURL
          }
          delete sellInfo.image
          console.log(sellInfo)

          try {
            const res = await axios.post('https://dress-hunter-api.vercel.app/api/v1/products/', sellInfo, {
              headers: {
                authorization: 'Bearer ' + localStorage.getItem('jwtoken')
              }
            })
            console.log(res)
            toast.success('product added successfully')
            reset()
            navigate('/dashboard/my-products')
          } catch (err) {
            console.log(err)
          }

        }
      })
      .catch(err => console.log(err))
  }
  return (
    <div className=''>
      <p className='text-2xl font-semibold text-center'>Add Product for sell</p>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
        <div className='flex flex-col gap-1'>
          <label htmlFor='role' className="block text-gray-600 text-xs pl-2">Select Category type: </label>
          <select id='role' {...register("category")} className='p-2 border rounded-md'>
            <option value="mens">Mens</option>
            <option value="womens">Womens</option>
            <option value="children">Children</option>
          </select>
        </div>
        {
          formData.map((el, id) =>
            <div className='flex flex-col gap-1' key={id}>
              <label htmlFor={el.name} className="block text-gray-600 text-xs pl-2">{el.name}</label>
              <input id={el.name} placeholder={el.placeholder} type={el.type} {...register(`${el.name}`, {
                required: true,
              })} className='p-2 border rounded-md border-gray-700 w-full' />
            </div>
          )
        }
        <div className='flex flex-col gap-1'>
          <label htmlFor='role' className="block text-gray-600 text-xs pl-2">Select condition type: </label>
          <select id='role' {...register("conditionType")} className='p-2 border rounded-md'>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
          </select>
        </div>
        {errors.exampleRequired && <span>This field is required</span>}
        <input type="submit" className='px-4 py-1 bg-gray-800 text-white cursor-pointer' />
      </form>
    </div>
  )
}

export default AddProduct