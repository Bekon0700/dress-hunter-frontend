import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { authContext } from '../../context/AuthProvider'

const NavBar = () => {
    const location = useLocation()
    const { user, userLogout } = useContext(authContext)
    const logOutHandler = async () => {
        await userLogout()
        localStorage.removeItem('jwtoken')
    }
    return (
        <div className='bg-purple-100'>
            <div className="navbar w-11/12 mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow font-semibold bg-base-100 rounded-box w-52">
                            <li><Link to='/blogs'>Blogs</Link></li>
                            {
                                user ?
                                    <>
                                        <li><Link to='/dashboard'>dashboard</Link></li>
                                    </> :
                                    <div></div>
                            }
                        </ul>
                    </div>
                    <Link to='/' className="text-lg lg:text-xl font-semibold text-gray-700">dressHunter</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0 font-semibold text-green-700">
                        <li><Link to='/blogs'>Blogs</Link></li>
                        {
                            user ?
                                <>
                                    <li><Link to='/dashboard'>dashboard</Link></li>

                                </> :
                                <div></div>
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ?
                            <Link onClick={logOutHandler} className="px-3 py-2 bg-red-900 text-white rounded-md">Logout</Link>
                            :
                            <Link to='/login' replace={true} state={{ from: `${location.pathname}`, to: '/login' }} className="px-3 py-2 bg-gray-800 text-white rounded-md">Login</Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default NavBar