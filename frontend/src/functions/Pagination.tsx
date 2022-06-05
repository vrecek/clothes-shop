import { NavigateFunction } from 'react-router-dom'
import gif from '../images/load.gif'
import Fetches from './Fetches'
import Loading from './Loading'

export default class Pagination {
   private limit: number
   private total: number
   private currentPage?: number

   private clickColorChange(e: React.MouseEvent): void {
      const t = e.target as HTMLElement
      const parent = t.parentElement as HTMLElement
      
      for(let x of parent.children) x.className = ''

      t.className = 'active'
   }

   public constructor(limit: number, total: number) {
      this.limit = limit
      this.total = total
   }

   public drawPages(startingNumber: number, action: (e: React.MouseEvent) => void, cname?: string): JSX.Element {
      const totalPages: number = Math.ceil(this.total / this.limit)  
      const current: number = startingNumber <= totalPages ? startingNumber : totalPages
      const className: string = cname ?? 'pagination-section'

      return (
         <section className={ className }>
            {
               [...Array(totalPages)].map((x, i) => (
                  <div 
                  className={ i === current - 1 ? 'active' : '' } 
                  key={ i }
                  onClick={ (e) => {
                     this.clickColorChange(e) 
                     action(e) 
                  }}
                  >
                     { (i + 1).toString() }
                  </div>
               ))
            }
         </section>
      )
   }

   public async basicPaginateFetch(details: OnClickFuncType): Promise<any> {
      const { uri, target, navigate, loadClassName, appendTarget } = details

      const currNum: string = target.textContent ?? '1'

      const l = new Loading(gif, loadClassName ?? 'loadingDivHeight loadingDivFixed')
      l.appendImage(appendTarget ?? document.body)

      try {
         const data: any = await Fetches.mix(`${ uri }/${ currNum }/${ this.limit }`, 'GET')

         return data

      }catch(err: any) {
         navigate('/error', { state: { msg: err.statusText, code: err.status } })

      }finally { l.removeImage() }
   }

   public set setCurrentPage(nr: number) {
      this.currentPage = nr
   }

   public get getTotal(): number {
      return this.total
   }

   public get getLimit(): number {
      return this.limit
   }

   public get getCurrent(): number {
      return this.currentPage ?? 0
   }
}

interface OnClickFuncType {
   uri: string,
   target: HTMLElement,
   navigate: NavigateFunction,
   loadClassName?: string,
   appendTarget?: HTMLElement
}