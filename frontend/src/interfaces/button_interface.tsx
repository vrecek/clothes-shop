export default interface CustomButton {
   text: string,
   additional?: string | HTMLElement | Element | JSX.Element,
   action: React.MouseEventHandler,
   cname?: string
}