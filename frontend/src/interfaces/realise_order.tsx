import DropDown from "../components/Main_Page/AllProducts/DropdownClass";
import ProductType from "./product_interface";
import UserType from "./user_interface";

export interface ExpandListType {
   countriesList: string[], 
   ddClass: DropDown,
   currentTextRef: React.RefObject<HTMLDivElement>
}

export interface ExpandListText {
   expandMenu: React.MouseEventHandler,
   initialText: string,
   currentTextRef: React.RefObject<HTMLDivElement>
}

export interface TwoContainerType {
   firstText: string, 
   secondText: string, 
   firstType?: string, 
   secondType?: string
}

export interface TableProduct {
   brand: string,
   imageSrc: string,
   price: number,
   name: string,
   quantity: number,
   discountPrice?: number
}

export interface FinalInformations {
   deliveryValue: string,
   user: UserType,
   products: ProductType[],
   formRef: React.RefObject<HTMLFormElement>,
   spanErrorFunc: (t: HTMLElement, text: string) => void,
   gif: string
}

export interface PaymentMethodType {
   reference: React.RefObject<HTMLDivElement>, 
   image: string, 
   showPaymentMenu: (e: React.ChangeEvent, type: string) => void,
   text: string,
   typeArgument: string
}

export interface CardMethodType {
   inpVal: string, 
   char: string, 
   setHook: React.Dispatch<React.SetStateAction<string>>, 
   maxLetters: number, 
   lettersBeforeChar: number, 
   labelText: string, 
   placeholder: string,
   cname?: string
}

export interface CardValidate {
   bool: boolean,
   msg: string
}

export interface DeliveryMethodFinalize {
   price: number,
   deliveryType: string,
   paymentMethod: string
}