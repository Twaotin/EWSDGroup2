import prisma from "./lib/prisma";

import bcrypt from "bcrypt"; // Import bcrypt for password comparison
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
    where: { email }, // Replace userId with the actual user ID you want to query
    include: {
        roles : true,
        department: true // Include the entire Department table
    }
});
                  console.log("query back", user)

                           if(user) 
                           {
                                                    console.log("User Exists");
                                 // const salt = await bcrypt.genSalt(10);
                             const hashedPasswordToCompare = await bcrypt.hash(user.password, 10);
            const match = await bcrypt.compare(
              credentials.password,
             hashedPasswordToCompare
            );

                            if(match) {
                            console.log("mathced")
                                /*
                               let userRole = " ";
                       if (user.role.name == "QA Manager" ) {
                           userRole = " Super_admin";
                              }else if(user.role.name == "QA Coordinator") {
                              userRole = "Admin";
                            }else{
                              userRole = "Staff";
                            } */

                            
                            const send = {
                              ...user, 
                              userId:user.userid,
                                 role: user.roles.name,  
                            department: user.department.departmentname,
                            departmentId: user.department.departmentid
                              //role:user.role.name,
                             // rolen: userRole,
                             //randomKey: 'Hey cool'
                            }
                                  return send
                            } 
                            
                            console.log("reached")

                            }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  
  ],
  callbacks: {
    session: ({ session, token }) => {
      console.log('Session Callback', { session, token });
      //session.user.role = token.role
      session.user.email = token.email
      session.user.userId = token.userId
      session.user.role = token.role
      session.user.department = token.department
      session.user.departmentId = token.departmentId
      //session.user.key = token.randomKey
      return session
    },
    jwt: ({ token, user }) => {
      console.log('JWT Callback', { token, user });
      if (user) {
        //token.role = user.rolen
        token.userId = user.userId
        token.role = user.role
        token.department = user.department
        token.departmentId = user.departmentId
        token.email= user.email
      }
      return token;
    },
  },
   pages: {
    signIn: "/login",
    signOut: '/logout',
  },
};
