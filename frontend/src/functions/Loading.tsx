export default class Loading {
   private src: string
   private className: string
   private currentAppendedImage: HTMLElement | undefined

   public constructor(gifSrc: string, className?: string) {
      this.src = gifSrc
      this.className = className ?? 'loadingDiv'
   }

   public appendImage(element: HTMLElement): void {
      const img = document.createElement('img')
      const div = document.createElement('div')

      div.className = this.className

      img.src = this.src

      div.appendChild(img)

      this.currentAppendedImage = div
      element.appendChild(div)
   }

   public removeImage(): void {
      if(!this.currentAppendedImage) return

      this.currentAppendedImage.remove()
   }
}