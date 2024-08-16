import React from 'react'

const LinearChart2 = () => {
  return (
    <div>
    <h3 className='mt-4'>2 Total Images</h3>
    <div className=' relative w-full h-[20px] mr-3 bg-gray-400 rounded-lg overflow-hidden mt-10 '>
        <div className=' absolute left-0 origin-left bg-orange-400 h-[20px]  w-[90%]'></div>
        <div className=' absolute left-0 origin-left bg-yellow-400 h-[20px]  w-[40%]'></div>
        <div className=' absolute left-0 origin-left bg-orange-800 h-[20px]  w-[20%]'> </div>
    </div>
    <div className='flex  gap-16 mt-8 ml-5'>
        <p>Critical(2)</p>
        <p className='ml-4'>High(9)</p>
    </div>
    </div>
  )
}

export default LinearChart2