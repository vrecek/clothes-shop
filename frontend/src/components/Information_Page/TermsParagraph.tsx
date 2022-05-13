import React from 'react'

const TermsParagraph = (props: any) => {
   return (
      <p style={{ fontWeight: '600', margin: '2em 0' }}>
         { props.children }
      </p>
   )
}

export default TermsParagraph