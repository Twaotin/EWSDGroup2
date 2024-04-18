import {  NextResponse } from "next/server";
import bcrypt from "bcrypt"; 
import prisma from "../../auth/[...nextauth]/lib/prisma"
export async function PATCH(request) {
    try {
        
         const formData =  await request.json()
    console.log(formData)
    if(formData.passwordChanged == true){
    const hashedpassword =await bcrypt.hash(formData.password, 10); 

    const match = await bcrypt.compare(formData.password, hashedpassword);
            if(match){
                console.log("match");
            }else{ 
                console.log("not matched")
            }
    console.log(formData)
    console.log("hassh",hashedpassword)

    const data =  {
        username: formData.username,
        password: hashedpassword,
        email: formData.email,
        roleid: formData.roleid, // Assuming the role ID you want to link
        departmentid:parseInt(formData.departmentid), // Assuming the department ID you want to link
        isactive: formData.isactive
      }
     console.log(data)
     const updatedUser = await prisma.users.update({
      where: { userid: formData.ideaid },
      data: data,
    });
    return NextResponse.json({ message: 'user Edit successfully!' })
}
  const data =  {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        roleid: formData.roleid, // Assuming the role ID you want to link
        departmentid:parseInt(formData.departmentid), // Assuming the department ID you want to link
        isactive: formData.isactive
      }
     console.log(data)
     const updatedUser = await prisma.users.update({
      where: { userid: formData.ideaid },
      data: data,
    });
 return NextResponse.json({ message: 'user Edit successfully!' })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Error processing request' });
    }
   

    
}