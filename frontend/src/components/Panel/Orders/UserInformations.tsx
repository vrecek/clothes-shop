import React from 'react'

const UserInformations = ({ name, mail }: { name: string, mail: string }) => {
   return (
      <>
      <h4>Username: <span>{ name }</span></h4>
      <h4>Mail: <span>{ mail }</span></h4>
      </>
   )
}

export default UserInformations