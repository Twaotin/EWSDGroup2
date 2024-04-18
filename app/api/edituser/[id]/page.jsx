import prisma from "../../auth/[...nextauth]/lib/prisma"
import Link from 'next/link'
import EditUser from "../../../components/admin/edituser"
async function Editusers(id) {

console.log(id)

}



export default async function page({params}) {
    const user = await Editusers(params.id)
  return (
    <div><EditUser id={params.id} /> </div>
  )
}
