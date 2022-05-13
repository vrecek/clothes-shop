export interface NavigateCategory {
   text: string,

   items: Array<{
      url: string,
      nameText: string
   }>,

   categoryName: string
}

export type CategoryNameType = 'shoes' | 'pants' | 'accessories' | 'hats' | 'tops'