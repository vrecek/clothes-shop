export interface NavigateCategory {
   text: string,

   manFirstList: Array<{
      url: string,
      nameText: string
   }>,

   manSecondList: Array<{
      url: string,
      nameText: string
   }>,

   womanFirstList: Array<{
      url: string,
      nameText: string
   }>,

   womanSecondList: Array<{
      url: string,
      nameText: string
   }>,
}

export interface TwoLists {
   firstList: Array<{
      url: string,
      nameText: string
   }>,

   secondList: Array<{
      url: string,
      nameText: string
   }>,
}