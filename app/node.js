import nodemailer from 'nodemailer';
import { getPrismaInstance, closePrismaInstance }  from "./api/auth/[...nextauth]/lib/prisma";
const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass,
  },
});

 const passwordresetemail = async (emailpassword, token) => {
  const passwordlink = `http://localhost:3000/api/resetpassword/${token}`;
   const passwordresetemail = {
  from: email,
  to: emailpassword,
    subject: 'Password Reset Request',
     html: ` click the link : <a href="${passwordlink}">Reset Password</a> Once you click, and are redirected 
     to the login, check your mail box again, you new password will be sent`
};

try {
    await transporter.sendMail(passwordresetemail);
    console.log('Password Reset Request sent successfully!');
  } catch (error) {
    console.error('Error Password Reset:', error);
  }
 }

const  passwordreset = async (emailpassword, newpassword) => {
  const passwordreset = {
  from: email,
  to: emailpassword,
    subject: 'Your New Password',
    text: `Your password has been reset. Here is your new password: <strong>${newpassword}</strong>. .`
};
try {
    await transporter.sendMail(passwordreset);
    console.log('Password Reset Request sent successfully!');
  } catch (error) {
    console.error('Error Password Reset:', error);
  }
 
}

const sendIdeaSubmissionNotification = async (ideaData) => {
 console.log(ideaData)
 try {
  const prisma = getPrismaInstance();
  const userEmail = await prisma.users.findFirst({
  where: {
    departmentid: { 
      equals: ideaData.departmentid
    },
    roleid: { 
      equals: 2 
    }
  },
  select: {
    email: true
  }
});
const emailString = userEmail.email;
console.log(userEmail)

   const mailOptions = {
  from: email,
  to: emailString,
    subject: 'New Idea Submitted!',
    text: `A new idea has been submitted by (UserID: ${ideaData.userid}).\nIdea Title: ${ideaData.ideatitle}`
};

  try {
    await transporter.sendMail(mailOptions);
    console.log('Idea submission notification sent successfully!');
  } catch (error) {
    console.error('Error sending notification:', error);
  }
 } catch (error) {
  console.log(error)
 }finally {
    await closePrismaInstance();
  }
 


};

const sendCommentNotification = async (commentData, id) => {
  try {
    const prisma = getPrismaInstance();
    const idea = await prisma.ideas.findFirst({
  where: {
    ideaid: id.ideaid,
  },
  select: {
    userid: true,
  },
});
const userId = idea.userid;
console.log(userId)
const user = await prisma.users.findFirst({
  where: {
    userid: userId,
  },
  select: {
    email: true,
  },
}); const userEmail = user.email;
console.log(userEmail)
  const mailOptions = {
    from: email,
    to: userEmail,
    subject: 'Comment on your idea!',
    text: `A new comment has been submitted on your idea titled "${commentData.commenttext}"`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Comment notification sent successfully!');
  } catch (error) {
    console.error('Error sending notification:', error);
  }

  } catch (error) {
    console.log(error)
  }finally {
    await closePrismaInstance();
  }


};

async function findQACoordinatorEmail(departmentId) {

  return 'qa_coordinator@example.com'; // Replace with actual email extraction
}

export { sendIdeaSubmissionNotification, sendCommentNotification, passwordreset, passwordresetemail };