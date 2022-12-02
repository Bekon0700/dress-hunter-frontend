import React from 'react'

const FormInput = ({data}) => {
    const {name, placeholder, type, inputTitle} = data
    return (
        <div className="space-y-1 text-base">
            <label htmlFor={name} className="block text-gray-600 dark:text-gray-100">{inputTitle ? inputTitle : name}</label>
            <input type={type} name={name} id={name} placeholder={placeholder} required={name == 'thumbnail' ? false : true} className="w-full px-4 py-3 rounded-md border border-gray-800  dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:border-violet-400 " />
        </div>
    )
}

export default FormInput