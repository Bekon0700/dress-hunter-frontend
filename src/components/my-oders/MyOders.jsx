import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { authContext } from '../../context/AuthProvider'

const MyOders = () => {
  const { user } = useContext(authContext)
  const [bill, setBill] = useState(1)
  const { data: myOdersList = [] } = useQuery({
    queryKey: ['myOdersList'],
    queryFn: async () => {
      const res = await axios.get(`https://dress-hunter-api.vercel.app/api/v1/users/myOders`, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('jwtoken')
        }
      })
      return res.data.oders
    }
  })

  const [paymentStatus, setPaymentStatus] = useState(false)
  const [successStatus, setSuccessStatus] = useState('')
  const [error, setError] = useState('')

  const { data: paymentSecret, refetch } = useQuery({
    queryKey: ['payment-secret', bill],
    queryFn: async () => {
      const res = await axios.post('https://dress-hunter-api.vercel.app/create-payment-intent', {
        bill
      })
      return res.data
    },
  })

  const stripe = useStripe()
  const elements = useElements()

  // useEffect(() => {
  //   refetch()
  // }, [])

  const modalBtn = (taka) => {
    setBill(taka)
    // console.log(bill)
    // refetch()
  }

  // console.log(paymentSecret)
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
      billing_details: {
        name: user?.displayName || '',
        email: user?.email || '',
        phone: user?.phoneNumber || '',
      }
    });

    if (error) {
      setError(error.message)
    }

    setPaymentStatus(true)
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      paymentSecret.client_secret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || '',
            email: user?.email || '',
            phone: user?.phoneNumber || '',
          }
        },
      },
    );

    if (paymentIntent?.status == 'succeeded') {
      setSuccessStatus(paymentIntent.id)
      toast.success('payment successful')
      setError('')
    } else {
      setError(confirmError.message)
      setSuccessStatus('')
    }
    setPaymentStatus(false)

    card.clear()
  }




  const imgUrl = 'https://media.istockphoto.com/id/1339542140/photo/denim-jeans-on-store-shelves.jpg?b=1&s=170667a&w=0&k=20&c=RD_einV827MuTqYeQZ1f6apWu7GMf4AmUCJRqwlJnrU='

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Buy Now</th>
            </tr>
          </thead>
          <tbody>
            {
              myOdersList.map((el, id) => {
                const { productId } = el
                const { resalePrice, paid, img, productName, _id } = productId
                return (
                  <tr key={id}>
                    <th>{id + 1}</th>
                    <th><img src={img || imgUrl} alt={productName} className='w-8 h-8 rounded-2xl' /></th>
                    <td>{productName}</td>
                    <td>{resalePrice}</td>
                    <td className='flex items-center gap-3'>
                      {
                        paid ?
                          <button className='px-3 py-1 bg-blue-200 text-black rounded-sm w-1/2'>Already Paid</button>
                          :
                          <label htmlFor="my-modal" onClick={() => modalBtn(resalePrice)} className='bg-blue-700 py-2 text-sm lg:text-base uppercase font-medium text-white w-full rounded-sm text-center cursor-pointer'>Pay now</label>
                      }
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className='flex justify-between items-center'>
            <p className='text-base font-bold'>Pay ${bill}</p>
            <label htmlFor="my-modal" className="bg-red-700 text-white px-2 py-1 rounded-md text-sm font-bold">X</label>
          </div>
          <p className='py-4 text-sm text-gray-500'>Please fill in your information carefully</p>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4 border py-4 px-2'>
            <input type="text" value={user?.displayName || 'name'} disabled className='text-base text-gray-400 cursor-no-drop' />
            <input type="text" value={user?.email || 'email'} disabled className='text-base text-gray-400 cursor-no-drop' />
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
            <button type="submit" disabled={!stripe} className={paymentStatus ? 'px-4 py-1 bg-gray-800 text-white cursor-wait' : 'px-4 py-1 bg-gray-800 text-white'}>
              Pay
            </button>
            {
              error && <p className='text-center text-sm font-medium text-red-500'>{error}</p>
            }
            {
              successStatus && <p className='text-left text-sm font-normal text-green-700'>Payment Success <br />Transection Id: <span >{successStatus}</span></p>
            }
          </form>
        </div>
      </div>
    </div>
  )
}

export default MyOders