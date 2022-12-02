import React from 'react'

const QuestionCard = ({data}) => {
    const {q, a} = data
  return (
    <div className='border border-gray-800 dark:border-gray-600 rounded-sm p-4 flex flex-col gap-3'>
        <p className='text-2xl font-semibold'>{q}</p>
        <p className='text-lg'>Answer: {a}</p>
    </div>
  )
}

export default QuestionCard