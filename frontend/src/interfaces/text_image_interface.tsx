export interface TextImageType {
   backColor: string,
   secColor: string,
   flexDirClass?: string
   title: string,
   text: string,
   buttonText: string,
   showIcons: boolean,
   imageSrc: string | string[],
   buttonAction: any
}

export interface TextSectionType {
   title: string,
   text: string,
   backColor: string,
   buttonText: string,
   buttonAction: React.MouseEventHandler
}