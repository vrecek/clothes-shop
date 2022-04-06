export default interface CustomButton {
   text: string,
   additional?: string | HTMLElement | Element,
   action: React.MouseEventHandler,
   cname?: string
}