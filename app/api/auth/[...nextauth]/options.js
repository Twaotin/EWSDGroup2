import { getPrismaInstance, closePrismaInstance } from "./lib/prisma";

import bcrypt from "bcrypt"; 
const NextAuth = require('next-auth');
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  
  providers: [
   CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "your-email",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials) {
        try {
           const prisma = getPrismaInstance();
            const { email, password } = credentials;
    const usery = prisma.users.findUnique({
  select: {
    userid: true,
    username: true,
    email: true,
    department: {
      select: {
        departmentname: true,
      },
    },
    roles: {
      select: {
        name: true,
      },
    },
  },
  where: { email },
});
const user = await prisma.users.findUnique({
    where: { email }, 
    include: {
        roles : true,
        department: true 
    }
});
                  console.log("query back", user)

                           if(user) 
                           {
                               console.log("User Exists");
                                
                             const hashedPasswordToCompare1 = await bcrypt.hash(credentials.password, 10);
                             const Passwordhash = await bcrypt.hash(credentials.password, 10);
                             
            const match = await bcrypt.compare(
              credentials.password,
             user.password
            );

                            if(match) {
                            console.log("mathced")
                               
                               await prisma.users.update({
                                where: { userid: user.userid },
                          data: {
                        lastlogin: new Date() 
                      }
                         });

                            
                            const send = {
                              ...user, 
                              userId:user.userid,
                                 role: user.roles.name,  
                            department: user.department.departmentname,
                            departmentId: user.department.departmentid,
                             
                            }
                                  return send
                            }else {
                              console.log("not matc")
                            } 
                            
                            console.log("reached")

                            }
        } catch (error) {
          console.log(error);
        }finally {
     await closePrismaInstance();
  }
        return null;
      },
    }),
  
  ],
  callbacks: {
    session: ({ session, token }) => {
      console.log('Session Callback', { session, token });
      
      session.user.email = token.email
      session.user.userId = token.userId
      session.user.role = token.role
      session.user.department = token.department
      session.user.departmentId = token.departmentId
      
      return session
    },
    jwt: ({ token, user }) => {
      console.log('JWT Callback', { token, user });
      if (user) {
        
        token.userId = user.userId
        token.role = user.role
        token.department = user.department
        token.departmentId = user.departmentId
        token.email = user.email
        
      }
      return token;
    },
  },
   pages: {
    signIn: "/login",
    signOut: '/logout',
  },
};
