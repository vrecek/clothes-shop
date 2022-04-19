import React from 'react'
import { AiOutlinePlus,AiOutlineMinus } from 'react-icons/ai'
import Button from '../../Reusable/Button'
import Fetches from '../../../functions/Fetches'
import { UpdateStockType } from '../../../interfaces/product_interface'
import Loading from '../../../functions/Loading'
import gif from '../../../images/load.gif'

const StockProduct = ({ imageString, brand, name, inStock, _id }: UpdateStockType) => {
   const [res, setRes] = React.useState<{ msg: string, success: false } | null>(null)
   const numCont = React.useRef<HTMLDivElement>(null)
   let number: number = 0

   const changeNum = (e: React.MouseEvent, action: string) => {
      const t = e.target as HTMLElement

      if(action === 'inc') {
         changeText('', '', (Math.abs(--number)).toString())

      }else if(action === 'dec') {
         changeText('', '', (Math.abs(++number)).toString())
      }

      changeText(number >= 0 ? 'Add' : 'Remove')

      changeText('', Math.abs(number).toString())

   }

   const changeVal = (e: any) => {
      const t = e.target as HTMLInputElement

      if(t.value[0] === '-') changeText('Remove')
      else changeText('Add')

      const num: number = Math.abs(parseInt(t.value))
      const val = isNaN(num) ? '0' : num.toString()

      changeText('', val, '')

      number = parseInt(t.value)
   }

   const blurInp = (e: React.FocusEvent) => {
      const t = e.target as HTMLInputElement

      if(!t.value) {
         number = 0
         changeText('Add', '0', '0')
      }
   }

   const saveChanges = async (e: React.MouseEvent) => {
      const l = new Loading(gif)
      const t = e.target as HTMLElement

      try {
         l.appendImage(t.parentElement!)
    
         const data = await Fetches.mix(`${ process.env.REACT_APP_API_MODIFY_STOCK }/${ _id }/${ number }`, 'PUT')      

         if(data.success) {
            const currVal = t.parentElement?.children[3].children[0]
            currVal!.textContent = (parseInt(currVal?.textContent!) + number).toString()
         }

         setRes({ msg: data.msg, success: data.success })

      }catch(err: any) {
         setRes({ msg: err.statusText, success: false })

      }finally { l.removeImage(); setTimeout(() => setRes(null), 1500); changeText('Add', '0', '0') }
   }

   const changeText = (txt?: string, num?: string, inpVal?: string) => {
      if(inpVal) {
         const inp = numCont.current!.parentElement!.children[4].children[1] as HTMLInputElement
         inp.value = inpVal
      }

      if(txt) {
         const ndTxt = numCont.current!.parentElement!.children[5].children[0]
         ndTxt.textContent = txt
      }

      if(num) {
         const ndNum = numCont.current!.parentElement!.children[5].children[1]
         ndNum.textContent = num
      }
   }

   return (
      <article>
         <figure>
            <img src={ imageString } alt='product' />
         </figure>

         <h4>{ brand }</h4>
         <h3>{ name }</h3>
         <h5>Current amount: <span>{ inStock }</span></h5>

         <div className='wrap'>
            <span onClick={ (e) => changeNum(e, 'inc') }> <AiOutlineMinus /> </span>
            <input onBlur={ blurInp } onKeyUp={ changeVal } type='number' />
            <span onClick={ (e) => changeNum(e, 'dec') }> <AiOutlinePlus /> </span>
         </div>

         <h6 ref={ numCont }><span>Add</span> <span className='num'>0</span></h6>

         <Button text='Save' action={ saveChanges } />

         {
            res && <h1 className={ res.success.toString() }>{ res.msg }</h1>
         }
      </article>
   )
}

export default StockProduct