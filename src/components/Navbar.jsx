import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex bg-[#000516] justify-between items-center h-12 px-12 text-white'>
      <div className="logo font-bold text-2xl">
        <span className='text-blue-700'>&lt;</span>
        Pass
        <span className='text-blue-700'>OP/&gt;</span>
        </div>
      {/* <ul>
        <li className='flex gap-4'>
            <a className='hover:font-bold' href="">Home</a>
            <a className='hover:font-bold' href="">About</a>
            <a className='hover:font-bold' href="">Contact</a>
        </li>
      </ul> */}
      <button className='flex p-1 rounded-full'>
        <img className='invert' width={23} src="icons/github.svg" alt="" />
        GitHub
      </button>
    </nav>
  )
}

export default Navbar
