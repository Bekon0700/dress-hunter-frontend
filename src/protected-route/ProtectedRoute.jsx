import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { authContext } from './../context/AuthProvider'
const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useContext(authContext)
  const location = useLocation()
  if (isLoading) {
    return (
      <div className='text-3xl text-center py-12'>
        <p>Loading</p>
      </div>
    )
  }

  if (user && user.uid) {
    return (
      <div>
        {children}
      </div>
    )
  } else {
    return <Navigate to='/login' replace={true} state={{ from: `${location.pathname}`, to: '/login' }} />
  }
}

export default ProtectedRoute