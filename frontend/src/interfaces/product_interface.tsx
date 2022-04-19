import { MouseEventHandler } from "react"

export default interface ProductType {
   _id: string, 

   imageString?: string,

   brand: string,

   inStock: number,

   name: string,

   price: number,

   description: string,

   category: string,

   size: string[],

   colors: string[],

   material: string[],

   image?: {
      data: Buffer
      extension: String
   },

   rate?: number,

   comments?: [{
      author: {
         username: string,        
         imageString: string,       
      },

      text: string,
      likes?: number,
      dislikes?: number,
      rate: number,
      date?: Date,
   }]
}

export interface SizeType {
   expandMenuFunc: MouseEventHandler<HTMLDivElement>,
   sizeActual: string,
   listReference: React.RefObject<HTMLUListElement>,
   sizes: string[]
}

export interface DeleteInterface {
   id: string,
   name: string,
   stateHook: React.Dispatch<React.SetStateAction<boolean>>,
   resultHook: React.Dispatch<React.SetStateAction<string>>,
   productHook: React.Dispatch<React.SetStateAction<ProductType[] | null>>
}

export interface UpdateStockType {
   _id: string,
   name: string,
   brand: string,
   imageString: string,
   inStock: number
}

export interface MainMenuProduct {
   imageString: string | undefined,
   name: string,
   brand: string,
   price: number,
   _id: string
}