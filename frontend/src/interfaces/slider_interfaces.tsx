export interface SliderRadioButtons {
   imagesNum: number, 
   changeFunc: changeHandler
}

type changeHandler = (e: React.MouseEvent, num: number) => void