import {  NextResponse } from "next/server";
import { getPrismaInstance, closePrismaInstance } from "../../auth/[...nextauth]/lib/prisma"
import bcrypt from "bcrypt"; 
export async function POST(request) {

    try {
         const prisma = getPrismaInstance();
        const formData =  await request.json()
        const departmentid = parseInt(formData.departmentid);
        const roleid = parseInt(formData.roleid );
       const hashedpassword =await bcrypt.hash(formData.password, 10); 
        const userdata = {
    username: formData.username ,
    password: hashedpassword , 
    email: formData.email ,
    isactive : formData.isactive,
    lastlogin: null,
        }
        const newUser = await prisma.users.create({
    data: {
      ...userdata,
      roles: {
        connect: {
          id:  roleid, 
        },
      },
      department: {
        connect: {
          departmentid:departmentid, 
        },
      },
    },
  }); 
  return NextResponse.json({ message: 'User created successfully!' })
 
    }catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error, user creation failed' });
  }finally {
    await closePrismaInstance();
  }
}