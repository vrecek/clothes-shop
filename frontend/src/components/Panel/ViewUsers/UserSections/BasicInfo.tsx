import React from 'react'

const BasicInfo = ({ username, mail, gender, createDate, role }: { username: string, mail: string, gender: string, createDate: string,role: string }) => {
   return (
      <section className='basic-info'>
         <h3>Username: <span>{ username }</span></h3>
         <h3>Mail: <span>{ mail }</span></h3>
         <h3>Gender: <span>{ gender }</span></h3>
         <h3>Created: <span>{ createDate }</span></h3>
         <h3>Permission: <span className='role'>{ role }</span></h3>
      </section>
   )
}

export default BasicInfo