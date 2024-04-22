import EditUser from "../../../components/admin/edituser"

export default async function page({params}) {

  return (
    <div><EditUser id={params.id} /> </div>
  )
}
