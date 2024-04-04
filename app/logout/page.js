'use client'
import { signOut } from "next-auth/react"

export default function logout () {
  return (
    <div>
        <button onClick={() => {
  console.log('Signing out...');
  signOut({redirect: true,callbackUrl:'http://localhost:3000'})
  .then(() => console.log('Signed out successfully'))
  .catch(error => console.error('Sign out error:', error));
}}>Sign out</button>

        </div>
  )
}
