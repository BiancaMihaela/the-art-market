import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const userGroup = localStorage.getItem('userGroup'); // poate fi "admin" sau null

const Sidebar = () => {
    return (
        <div className='w-[18%] min-h-screen border-r-2'>
            <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>

                <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/add">
                    <img className='w-5 h-5' src={assets.add_icon} alt="" />
                    <p className='hidden md:block'>Add Items</p>
                </NavLink>

                {userGroup === 'admin' && (
                    <NavLink to="/create-artist" className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
                        <img src={assets.add_icon} className='w-5 h-5' />
                        <p className='hidden md:block'>Create Artist</p>
                    </NavLink>
                )}

                <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/list">
                    <img className='w-5 h-5' src={assets.order_icon} alt="" />
                    <p className='hidden md:block'>List Items</p>
                </NavLink>

                {userGroup === 'admin' && (
                    <NavLink to="/reports" className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
                        <img src={assets.report} className='w-5 h-5' />
                        <p className='hidden md:block'>Reports</p>
                    </NavLink>
                )}

                {userGroup === 'admin' && (
                    <NavLink to="/orders" className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'>
                        <img src={assets.order_icon} className='w-5 h-5' />
                        <p className='hidden md:block'>Orders</p>
                    </NavLink>
                )}
            </div>

        </div>
    )
}

export default Sidebar