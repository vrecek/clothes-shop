import { ChangeEventHandler, FormEventHandler, MouseEventHandler } from "react"
import ProductType, { CartProductType } from "./product_interface"

export default interface UserType {
   _id: string,
   username: string,
   mail: string,
   hash: string,
   salt: string,
   gender: string,
   role: string,
   createDate: string,
   basket?: [{
      _id: string,
      productId: string,
      selectedSize: string
   }],
   image?: {
      data: Buffer
      extension: String
   },
   imageString?: string,
   personalData?: LocationType[],
   purchaseHistory?: ProductType[]
}

export interface TableDataType {
   username: string,
   mail: string,
   gender: string,
   createDate: string
}

export interface UserAvatarSection {
   saveAvatar: FormEventHandler<HTMLFormElement>,
   onChangeFile: ChangeEventHandler<HTMLInputElement>,
   showMenu: MouseEventHandler<Element>,
   currentImage: React.LegacyRef<HTMLImageElement>,
   changeRes: {
      msg: string;
      success: boolean;
   } | null,
   imageString: string
}

export interface LocationType {
   _id: string,
   address: {
      country: string,
      city: string,
      zip: string,
      street: {
         name: string,
         building: number,
         flat: number
      }
   },
   firstname: string,
   surname: string
}

export interface CartOneProductType {
   productStateHook: React.Dispatch<React.SetStateAction<CartProductType[] | null>>,
   userId: string,
   product: CartProductType,
   gif: string,
   asideRef: React.RefObject<HTMLDivElement>
}

export interface LocationEntryInfoType {
   country: string,
   surname: string,
   firstname: string
}

export interface LocationMap {
   number: number,
   details: LocationType,
   setHook: React.Dispatch<React.SetStateAction<LocationType[]>>,
   userId: string
}