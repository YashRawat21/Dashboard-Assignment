import React from 'react'

const LinearChart = () => {
  return (
    <div>
    <h3 className='mt-4'>1470 Total Vulnerabilities</h3>
    <div className=' relative w-full mr-3 h-[20px] bg-gray-400 rounded-lg overflow-hidden mt-10'>
        <div className=' absolute left-0 origin-left bg-green-400 h-[20px]  w-[90%]'></div>
        <div className=' absolute left-0 origin-left bg-yellow-400 h-[20px]  w-[40%]'></div>
        <div className=' absolute left-0 origin-left bg-red-400 h-[20px]  w-[10%]'> </div>
    </div>
        <div className='flex  gap-16 mt-8 ml-5'>
        <p>Critical(9)</p>
        <p className='ml-4'>High(150)</p>
    </div>
    </div>
  )
}

export default LinearChart