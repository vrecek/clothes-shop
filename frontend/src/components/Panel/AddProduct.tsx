import React from 'react'
import '../../css/AddProduct.css'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { IoMdArrowDropdown } from 'react-icons/io'
import Button from '../Reusable/Button'
import blank from '../../images/blank.png'
import Brand from './AddInputs/Brand'
import Name from './AddInputs/Name'
import Price from './AddInputs/Price'
import Image from './AddInputs/Image'
import Description from './AddInputs/Description'
import DropDown from '../Main_Page/AllProducts/DropdownClass'
import Loading from '../../functions/Loading'
import gif from '../../images/load.gif'

const AddProduct = () => {
   const currentImageRef = React.useRef<HTMLDivElement>(null)

   const listReference = React.useRef<HTMLUListElement>(null)
   const listReferenceSub = React.useRef<HTMLUListElement>(null)

   const [currentCategory, setCategory] = React.useState<string>('')
   const [currentSubCategory, setSubCategory] = React.useState<string>('')

   const d = new DropDown()
   const d1 = new DropDown()

   const [result, setResult] = React.useState<{ msg: string, success: boolean } | null>(null)

   const addOrDel = (e: React.MouseEvent, type: string, cname: string) => {
      const t = e.target as HTMLElement
      const elemCont = t.parentElement!.parentElement!.children[2] as HTMLElement

      if(type === 'add') {
         const inp = document.createElement('input')

         inp.type = 'text'
         inp.className = cname
         elemCont.appendChild(inp)

         return
      }

      const elem = elemCont.children

      if(elem.length <= 1) return

      const deleted = [...elem].slice(-1)[0]
      deleted.remove()
   }

   const currentImage = (e: React.ChangeEvent) => {
      const t = e.target as HTMLInputElement
      const file = t.files![0]

      const image = currentImageRef.current!.children[0] as HTMLImageElement
      image.src = URL.createObjectURL(file)
   }

   const submitProduct = async (e: React.FormEvent) => {
      e.preventDefault()

      const t = e.target as HTMLFormElement

      const l = new Loading(gif)
      l.appendImage(t.elements[t.elements.length - 1] as HTMLElement)

      const [brand, name, price, text] = [...t.elements as HTMLCollectionOf<HTMLInputElement>].map(x => x.value)
      const sizes = [...t.elements as HTMLCollectionOf<HTMLInputElement>].filter(x => x.className === 'size').map(x => x.value)
      const colors = [...t.elements as HTMLCollectionOf<HTMLInputElement>].filter(x => x.className === 'color').map(x => x.value)
      const materials = [...t.elements as HTMLCollectionOf<HTMLInputElement>].filter(x => x.className === 'material').map(x => x.value)
      const image = [...t.elements as HTMLCollectionOf<HTMLInputElement>].filter(x => x.className === 'file').map(x => x.files![0])[0]

      const formData = new FormData()

      formData.append('image', image)
      formData.append('brand', brand)
      formData.append('name', name)
      formData.append('price', price)
      formData.append('text', text)
      formData.append('category', currentCategory)
      for(let x of sizes) formData.append('sizes[]', x)
      for(let x of colors) formData.append('colors[]', x)
      for(let x of materials) formData.append('materials[]', x)

      try {
         const res = await fetch(process.env.REACT_APP_API_ADD_PRODUCT!, {
            method: "POST",
            body: formData
         })
         const data = await res.json()

         setResult({ msg: data.response, success: data.success })

      }catch(err: any) {
         setResult({ msg: err.message, success: false })

      }finally { l.removeImage(); setTimeout(() => setResult(null), 2000); }
   }

   
   const expandMenuFunc = (e: React.MouseEvent, dd: DropDown, listRef: React.RefObject<HTMLUListElement>) => {
      const t = e.target as HTMLElement

      dd.switchActive()
      dd.rotateArrow(t.children[1] as HTMLElement)
      
      if(dd.getActive) {
         dd.expandMenu(t, listRef.current!)
         return
      }

      dd.shrinkMenu(t, listRef.current!, .5)
   }

   React.useEffect(() => {
      initLoop(listReference, d, setCategory)
      initLoop(listReferenceSub, d1, setSubCategory)
   }, [d, d1])

   const initLoop = (
      listRef: React.RefObject<HTMLUListElement>, 
      ddClass: DropDown, 
      stateHook: React.Dispatch<React.SetStateAction<string>>) => 
      {
         for(let x of [...listRef.current!.children]) {
            x.addEventListener('click', (e) => {
               const t = e.target as HTMLElement
               
               const list = listRef.current?.parentElement?.children[1] as HTMLElement

               ddClass.shrinkMenu(list, listRef.current!, .5)
               ddClass.switchActive()

               stateHook(t.textContent!)
            })
         }
   }

   return (
      <main className='add-product'>
         <h1>Add new product:</h1>
         <h3>All fields are required</h3>

         <article>

            {
               result && <h5 className={ result.success.toString() }>{ result.msg }</h5>
            }

            <form onSubmit={ submitProduct } className='wrap'>
               <Brand />

               <Name />

               <section className='select'> 
                  <label>Category</label>

                  <div className='select-div' onClick={ (e) => expandMenuFunc(e, d, listReference) }>
                     <h5>{ currentCategory }</h5>
                     <span className='arrow'> <IoMdArrowDropdown /> </span>
                  </div>

                  <ul ref={ listReference }>
                     <li>Hats</li>
                     <li>Top</li>
                     <li>Hoodie</li>
                     <li>T-shirt</li>
                     <li>Pants</li>
                     <li>Shoes</li>
                     <li>Underwear</li>
                     <li>Accessories</li>
                  </ul>
               </section>

               <section className='select sub'> 
                  <label>Subcategories</label>

                  <div className='select-div' onClick={ (e) => expandMenuFunc(e, d1, listReferenceSub) }>
                     <h5>{ currentSubCategory }</h5>
                     <span className='arrow'> <IoMdArrowDropdown /> </span>
                  </div>

                  <ul ref={ listReferenceSub }>
                     <li>Hats</li>
                     <li>Top</li>
                     <li>Hoodie</li>
                     <li>T-shirt</li>
                     <li>Pants</li>
                     <li>Shoes</li>
                     <li>Underwear</li>
                     <li>Accessories</li>
                  </ul>
               </section>

               <Price />

               <Description />

               <div>
                  <label>Sizes</label>

                  <section className='icons'>
                     <span onClick={ (e) => addOrDel(e, 'del', 'size') }><AiOutlineMinus /></span>
                     <span onClick={ (e) => addOrDel(e, 'add', 'size') }><AiOutlinePlus /></span>
                  </section>

                  <section className='box'>

                     <input className='size' type='text' />

                  </section>
               </div>

               <Image currentImage={ currentImage } />

               <div>
                  <label>Colors</label>
                  
                  <section className='icons'>
                     <span onClick={ (e) => addOrDel(e, 'del', 'color') }><AiOutlineMinus /></span>
                     <span onClick={ (e) => addOrDel(e, 'add', 'color') }><AiOutlinePlus /></span>
                  </section>

                  <section className='box'>

                     <input className='color' type='text' />

                  </section>
               </div>

               <div>
                  <label>Materials</label>
                  
                  <section className='icons'>
                     <span onClick={ (e) => addOrDel(e, 'del', 'material') }><AiOutlineMinus /></span>
                     <span onClick={ (e) => addOrDel(e, 'add', 'material') }><AiOutlinePlus /></span>
                  </section>

                  <section className='box'>

                     <input className='material' type='text' />

                  </section>
               </div>

               <Button text='Submit' action={ () => {} } />
            </form>

            <aside>
               <h2>Current image</h2>
               <figure ref={ currentImageRef }>
                  <img src={ blank } alt='current-image' />
               </figure>
            </aside>
            
         </article>
         
      </main>
   )
}

export default AddProduct