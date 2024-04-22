import { NextResponse } from 'next/server';
import { withAuth } from "next-auth/middleware";
export default withAuth(
  function middleware(req) {
    console.log(req.nextUrl.pathname);
    console.log(req.nextauth.token.role);

    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token.role == "staff"
    ) {
      return NextResponse.rewrite(new URL("/staff/notallowed", req.url));
    }
     if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token.role == "QADeptment Coordinator"
    ) {
      return NextResponse.rewrite(new URL("/departmentcoordinator/notallowed", req.url));
    }
     if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token.role == "QA Manager"
    ) {
      return NextResponse.rewrite(new URL("/qamanager/notallowed", req.url));
    }
     
    if (
      req.nextUrl.pathname.startsWith("/departmentcoordinator") &&
      req.nextauth.token.role == "staff"
    ) {
      return NextResponse.rewrite(new URL("/staff/notallowed", req.url));
    }
    
     if (
      req.nextUrl.pathname.startsWith("/qamanager") &&
      req.nextauth.token.role == "staff"
    ) {
      return NextResponse.rewrite(new URL("/staff/notallowed", req.url));
    }
     if (
      req.nextUrl.pathname.startsWith("/qamanager") &&
      req.nextauth.token.role == "QADeptment Coordinator"
    ) {
      return NextResponse.rewrite(new URL("/departmentcoordinator/notallowed", req.url));
    }

  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
    matcher: ['/admin', '/departmentcoordinator',  '/qamanager']
}