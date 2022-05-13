import React from 'react'
import CurrentExpandText from './CurrentExpandText'
import SelectExpandList from './SelectExpandList'
import DropDown from '../../Main_Page/AllProducts/DropdownClass'
import countries from '../../../json/someEuropeCountries.json'
import Step from './Step'
import TextInfo from './TextInfo'
import { GiEarthAmerica } from 'react-icons/gi'

const SelectCountry = () => {
   const txtRef = React.useRef<HTMLDivElement>(null)
   
   const d = new DropDown()
   const expandMenu = (e: React.MouseEvent) => {
      const t = e.target as HTMLElement

      d.switchActive()
      if(d.getActive) {
         d.expandMenu(t, t.parentElement!.children[3] as HTMLElement)
         return
      }

      d.shrinkMenu(t, t.parentElement!.children[3] as HTMLElement, .3)
   }

   return (
      <section className='select-country'>
         <Step num={ 1 } />
         <TextInfo>Delivery country <GiEarthAmerica /> </TextInfo>

         <CurrentExpandText 
            currentTextRef={ txtRef } 
            initialText='' 
            expandMenu={ expandMenu } 
         />
         <SelectExpandList 
            currentTextRef={ txtRef } 
            ddClass={ d } 
            countriesList={ countries } 
         />
      </section>
   )
}

export default SelectCountry