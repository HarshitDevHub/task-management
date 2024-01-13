import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faGrip } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const Navbar = () => {
    const router = useRouter();
    const handleLogout = async(e)=>{
        try {
            await axios.get('/api/users/logout/')
            toast.success("Logout successfully")
            setTimeout(() => {
            router.push('/')
            }, 2000);
            
        } catch (error) {
            console.log("Error during logout:",error)
        }
    }
  return (
    <nav className='border-b p-3 flex justify-between items-center'>
        <div className="logo-area">
            <h1 className='font-bold'> <a href="/">TaskProSync</a></h1>
        </div>                                                                                           
        <div className="nav-links flex gap-2">
            <div className="user-area flex items-center">

                {/* <div className="user-profile flex items-center gap-2">
                <FontAwesomeIcon icon={faBell}  className='w-3'/>
                    <img src="https://placehold.co/40x40" className='rounded-full' alt="" />
                </div> */}
            </div>
            <h2 onClick={handleLogout} className='cursor-pointer'>Logout</h2>
        </div>
    </nav>
  )
}

export default Navbar