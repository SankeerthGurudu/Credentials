import React from 'react'

const Footer = () => {
    return (
        <div className=' bg-[#000516] flex flex-col justify-center items-center text-white fixed bottom-0 w-full'>
            <div className="logo font-bold text-2xl">
                <span className='text-blue-700'>&lt;</span>
                Pass
                <span className='text-blue-700'>OP/&gt;</span>
            </div>
            <div className='flex'>Created with<img className='w-6 h-6 mx-1' src="icons/heart.png" alt="" /> by Sankeerth</div>
        </div>
    )
}

export default Footer
