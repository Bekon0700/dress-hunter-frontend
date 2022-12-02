import React, { useState } from 'react'
import toast from 'react-hot-toast'
import FormInput from '../../components/form-input/FormInput'
import formData from './serviceList'

const AddService = () => {
  const [data, setData] = useState({})
  const handleForm = (e) => {
    const {name, value, files} = e.target
    if(name == 'img-upload'){
      setData(prevState => ({...prevState, [name]: files[0] }))
    }else{
      setData(prevState => ({...prevState, [name]: value}))
    }
  }

  const submitHandle = (e) => {
    e.preventDefault()
    const fData = new FormData()
    fData.append('image', data['img-upload'])

    fetch('https://computer-man-backend.vercel.app/api/v1/services/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('jwtoken')}`
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      const {service} = data
      fetch(`https://computer-man-backend.vercel.app/api/v1/services/img-upload/${service._id}`, {
        method: 'POST',
        body: fData
      })
      .then(res => res.json())
      .then(data => toast.success('img uploaded'))
      .catch(err => {
        toast.error('Img could not uploaded, due to vercel server problem')
      })
      e.target.reset()
      toast.success('Service Added')
    })
    .catch(err => {
      console.log(err)
    })

  }

  return (
    <div>
      <div className='bg-white dark:bg-gray-800  dark:text-gray-100'>
        <div className='w-11/12 mx-auto flex py-12 lg:py-12'>
          <div className="w-full p-8 space-y-3 rounded-md text-gray-900">
            <h1 className="text-2xl font-bold text-center py-6">Add Service</h1>
            <form onBlur={handleForm} onSubmit={submitHandle} className="space-y-6 ng-untouched ng-pristine ng-valid">
              {
                formData.map(el => <FormInput key={el.id} data={el} />)
              }
              <div className="space-y-1 text-base">
                <label htmlFor='description' className="block text-gray-600 dark:text-gray-100">Description</label>
                <textarea name={'description'} id={'description'} required={true} className="w-full px-4 py-3 rounded-md border border-gray-800  dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:border-violet-400 " />
              </div>
              <div className='flex items-center gap-3'>
                <label htmlFor='img-upload' className="block text-gray-600 dark:text-gray-100">Service Image Upload</label>
                <input type="file" name='img-upload' id='img-upload' className="file-input w-full max-w-md" />
              </div>
              <button className="block w-full p-3 text-center font-semibold text-lg rounded-sm text-gray-200 bg-violet-400">Add Service</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddService