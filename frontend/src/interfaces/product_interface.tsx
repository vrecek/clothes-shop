import { MouseEventHandler } from "react"
import UserType from "./user_interface"

export default interface ProductType {
   _id: string, 

   imageString?: string,

   brand: string,

   inStock: number,

   name: string,

   onSalePercent?: number,

   quantity?: number,

   discountPrice?: number,

   productSize?: string,

   orderedTimes?: number,

   price: number,

   description: string,

   createDate?: number,

   views?: number,

   category: string,

   subCategory?: string

   size: string[],

   colors: string[],

   material: string[],

   image?: {
      data: Buffer
      extension: String
   },

   rate: number,

   comments: CommentType[]
}

export interface CommentType {
   author: {
      username: string,        
      imageString: string,       
   },

   _id: string,
   text: string,
   whoLiked: string[],
   whoDisliked: string[],
   likes: number,
   dislikes: number,
   rate: number,
   date: string,
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
   productHook: React.Dispatch<React.SetStateAction<{
      original: ProductType[];
      copy: ProductType[];
  } | null>>
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
   _id: string,
   onSalePercent: number
}

export interface CartProductType {
   _id: string,
   imageString: string | undefined,
   name: string,
   brand: string,
   price: number,
   inStock: number,
   productSize: number,
   objectId: string,
   onSalePercent: number,
}

export interface CartProductQuantityType {
   quantityFunc: (e: React.MouseEvent, dir: string) => void,
   price: number,
   discountPercent: number
}

export interface CartDetailsType {
   user: UserType,
   products: ProductType[],
   totalPrice: number
}

export interface ProductTextType {
   _id: string, 
   price: number, 
   brand: string, 
   name: string, 
   size: string[], 
   colors: string[], 
   description: string, 
   inStock: number, 
   onSalePercent: number, 
   rate: number
   user: UserType | null
}

export interface CommentUserInfoType {
   username: string,
   date: string,
   rate: number
}

export interface CommentRateType {
   likes: number, 
   dislikes: number, 
   user: string, 
   productId: string,
   commentId: string,
   whoLiked: string[],
   whoDisliked: string[]
}