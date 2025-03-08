import React from 'react'

const NavBar = () => {
    return (

        <nav className='bg-slate-800 text-white'>
            <div className="mycontainer flex justify-between items-center px-4 h-14 container py-5 mx-auto">


                <div className='logo font-bold text-white text-2xl'>

                <span className='text-green-700'> &lt;</span>
                <span className='text-green-700'>i</span>
                    Pass
                <span className='text-green-700'>word/&gt;</span>
                </div>
                <ul>
                    <li className='flex gap-4'>
                        <a className='hover:font-bold' href='/'>Home</a>
                        <a className='hover:font-bold' href='/'>Contact</a>
                        <a className='hover:font-bold' href='/'>About</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar