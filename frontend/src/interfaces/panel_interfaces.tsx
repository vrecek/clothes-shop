import Pagination from "../functions/Pagination";
import ProductType from "./product_interface";
import UserType, { PurchaseHistoryType } from "./user_interface";

export interface PurchaseHistorySectionType {
   purchaseHistory: PurchaseHistoryType[],
   total: number,
   showHistory: () => void
}

export interface PanelUserType {
   details: UserType, 
   setUsersHook: React.Dispatch<React.SetStateAction<
                  {
                     original: UserType[],
                     copy: UserType[]
                  } | null>>
}

export interface PanelUserHistoryPurchaseType {
   username: string,
   closeHook: React.Dispatch<React.SetStateAction<boolean>>,
   purchaseHistory: PurchaseHistoryType[]
}

export interface HistoryRow {
   number: number,
   price: number,
   name: string,
   brand: string,
   image: string
}

export interface AvailableOrdersType {
   mail: string,
   username: string,
   id: string,
   userId: string,

   products: AvailableOrdersProductsType[],

   informations: AvailableOrdersTypeInformations
}

export interface AvailableOrdersTypeInformations {
   cost: number,
   delivered: boolean,
   orderedDate: string,

   deliveryInformation: {
      deliveryMethod: string
      deliveryPrice: number
      deliveryType: string,

      card: {
         cvv?: string
         expiry?: string
         number?: string
         paymentMethod?: string
      },

      location: {
         city: string,
         country: string,
         zip: string,

         street: {
            building: number,
            flat: number,
            name: string
         }
      },

      person: {
         firstname: string,
         surname: string
      }
   }
}

export interface AvailableOrdersTableType {
   headNames: string[],
   bodyValues: (string | number)[],
   tableClassName?: string
}

export interface AvailableOrdersProductsType {
   item: {
      brand: string,
      imageSrc: string,
      name: string,
      price: number
   },
   productId: string,
   quantity: number,
   size: string
}

export interface OrderComponentType {
   details: AvailableOrdersType,
   productsHook: React.Dispatch<React.SetStateAction<AvailableOrdersType[] | null>>
}

export interface PanelAllProducts {
   products: ProductType[],
   total: number
}

export interface ProductDetailsState {
   total: number,
   pagination: Pagination
}