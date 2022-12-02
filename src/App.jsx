import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Main from './components/layout/Main'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Registration from './pages/registration/Registration'
import Blog from './pages/blog/Blog'
import Error from './pages/error/Error'

import ProtectedRoute from './protected-route/ProtectedRoute'

import { Toaster } from 'react-hot-toast'
import Categories from './components/categories/Categories'
import Dashboard from './pages/dashboard/Dashboard'
import MyOders from './components/my-oders/MyOders'
import MyProducts from './components/seller-route/MyProducts'
import AddProduct from './components/seller-route/AddProduct'
import MyBuyers from './components/seller-route/MyBuyers'
import AllSellers from './components/admin-route/AllSellers'
import AllBuyers from './components/admin-route/AllBuyers'
import ReportedItems from './components/admin-route/ReportedItems'
import AuthorizedRoute from './protected-route/AuthorizedRoute'

const router = createBrowserRouter([
  {
      path: '/',
      element: <Main />,
      errorElement: <Error />,
      children: [
          {
              path: '/',
              element: <Home />
          },
          {
              path: 'home',
              element: <Home />
          },
          {
              path: 'categories/:name',
              element: <Categories />
          },
          {
              path: 'blogs',
              element: <Blog />
          },

          {
              path: 'dashboard',
              element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
              children: [
                {
                  path: 'my-products', 
                  element: <AuthorizedRoute role='seller'><MyProducts /></AuthorizedRoute>
                },
                {
                  path: 'add-a-product', 
                  element: <AuthorizedRoute role='seller'><AddProduct /></AuthorizedRoute>
                },
                {
                  path: 'my-oders', 
                  element: <AuthorizedRoute role='buyer'><MyOders /></AuthorizedRoute>
                },
                {
                  path: 'all-sellers', 
                  element: <AuthorizedRoute role='admin'><AllSellers /></AuthorizedRoute>
                },
                {
                  path: 'all-buyers', 
                  element: <AuthorizedRoute role='admin'><AllBuyers /></AuthorizedRoute>
                },
              ]
          },
          {
              path: 'login',
              element: <Login />
          },
          {
              path: 'register',
              element: <Registration />
          },
      ]
  }
])

function App() {
  return (
    <div >
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </div>
  )
}

export default App
