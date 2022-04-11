import React from 'react'
import { IoMdArrowDropdown } from 'react-icons/io'

const ProdSize = ({ expandMenuFunc, sizeActual, listReference }: any) => {
   return (
      <section className='size'>
         <h4>Select size: </h4>

         <section className='select'> 
            <div onClick={ expandMenuFunc }>
               <h5>{ sizeActual }</h5>
               <span className='arrow'> <IoMdArrowDropdown /> </span>
            </div>

            <ul ref={ listReference }>
               <li>35</li>
               <li>36</li>
               <li>37</li>
               <li>38</li>
               <li>39</li>
               <li>40</li>
            </ul>
         </section>
      </section>
   )
}

export default ProdSize