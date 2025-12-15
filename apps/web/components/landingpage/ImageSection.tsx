import Image from 'next/image'
import React from 'react'

const ImageSection = () => {
  return (
    <div className='relative min-h-screen pt-16 pb-20'>
        <Image 
          src='/images/landing/dashboard.png' 
          alt='Image Section' 
          width={1920} 
          height={1080} 
          className='w-7xl mx-auto h-auto object-cover rounded-3xl border border-gray-300/20 '
        />
        <div className='absolute bottom-0 right-20 transform rounded-2xl bg-gray-300/50 p-2'>
           <Image 
          src='/images/landing/phone-image-2.png' 
          alt='Image Section' 
          width={500} 
          height={600} 
          className='w-sm mx-auto h-auto object-cover rounded-2xl border border-gray-300/20 '
        />
        </div>
    </div>
  )
}

export default ImageSection