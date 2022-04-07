interface ElementColors {
   color?: string,
   background?: string
}

type color = 'color' | 'background'

export default class DropDown {
   private active: boolean
   private activeColors?: ElementColors
   private defaultColors?: ElementColors

   private changeColors(element: HTMLElement, isActive: boolean) {
      if(!this.defaultColors) {
         const clr = window.getComputedStyle(element, null).getPropertyValue('color')
         const back = window.getComputedStyle(element, null).getPropertyValue('background-color')

         this.defaultColors = {
            color: clr,
            background: back
         }
      }
      
      const clrObject = isActive ? this.activeColors : this.defaultColors

      for(let x in clrObject) {
         const c = x as color
         element.style[c] = `${ clrObject[c] }`
      }
   }

   public constructor(activeColors?:ElementColors) {
      this.active = false
      this.activeColors = activeColors
   }

   /* --! PADDING li BUG !---! USE HEIGHT !-- */

   /*
      list MUST BE:
         -height: 0
         -display: none
         -overflow: hidden
   */
   public expandMenu(clickedList: HTMLElement, hiddenList: HTMLElement): void {
      if(!this.active) return

      if(this.activeColors) this.changeColors(clickedList, true)

      hiddenList.style.height = 'auto'
      hiddenList.style.display = 'block'

      const height: number =  parseFloat(
                                 window.getComputedStyle(hiddenList, null).getPropertyValue('height')
                                 .split('')
                                 .filter(x => isFinite( parseInt(x) ))
                                 .join('')
                              )

      hiddenList.style.height = '0'

      setTimeout(() => {
         hiddenList.style.height = `${ height }px`
      }, 5);
   }

   public shrinkMenu(clickedList: HTMLElement, hiddenList: HTMLElement, yourTransition: number): void {
      if(this.active) return

      if(this.activeColors) this.changeColors(clickedList, false)

      hiddenList.style.height = '0px'
      setTimeout(() => {
         hiddenList.style.display = 'none'
      }, yourTransition * 1000);
   }  

   public rotateArrow(arrow: HTMLElement): void {
      if(this.active) {
         arrow.style.transform = 'rotate(180deg)'
         return
      }

      arrow.style.transform = 'rotate(0)'
   }

   public switchActive(): void { this.active = !this.active }

   public get getActive(): boolean { return this.active }
}