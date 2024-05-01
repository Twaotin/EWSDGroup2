'use client'
import { signOut } from "next-auth/react"
import Button from 'react-bootstrap/Button';
export default function logout () {
  return (
    <div className="logoutform">
      <div className="logoutforminner">
       
        <Button onClick={() => {
  console.log('Signing out...');
  signOut({redirect: true,callbackUrl:'http://localhost:3000'})
  .then(() => console.log('Signed out successfully'))
  .catch(error => console.error('Sign out error:', error));
}} variant="info">Sign out</Button>
        </div>
        </div>
  )
}
