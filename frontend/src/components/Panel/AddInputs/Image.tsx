import React from 'react'

const Image = ({ currentImage }: { currentImage: React.ChangeEventHandler }) => {
   return (
      <div>
         <label>Image</label>
         <input className='file' onChange={ currentImage } type='file' />
      </div>
   )
}

export default Image