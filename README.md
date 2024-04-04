This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

// dont do this, my mistake, the instructions are at the very end
Steps: 
open terminal
1. npm install next-auth
2. npm install prisma --save-dev
3. npm install @prisma/client
4
5. npx prisma init
6. npm install bcrypt
7. use this to create you postgre db in pgAdmin:
CREATE TABLE users (
    userid SERIAL PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255), -- hashed password
    email VARCHAR(255),
    roleid INT,
    departmentid INT, -- New column for linking to departments
    FOREIGN KEY (roleid) REFERENCES roles(id),
    FOREIGN KEY (departmentid) REFERENCES departments(departmentid) -- Reference to departments table
);

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE departments (
    departmentid SERIAL PRIMARY KEY,
    departmentname VARCHAR(255)
);

CREATE TABLE ideas (
    ideaid SERIAL PRIMARY KEY,
    userid INT,
    departmentid INT,
    closuredateid INT,
    ideatext TEXT,
    submissiondate TIMESTAMP,
    isenabled BOOLEAN,
    isanonymous BOOLEAN,
    isinvestigated BOOLEAN,
    isthumbsup INT,
    isthumbsdown INT,
    FOREIGN KEY (userid) REFERENCES users(userid),
    FOREIGN KEY (departmentid) REFERENCES departments(departmentid),
    FOREIGN KEY (closuredateid) REFERENCES closuredates(closuredateid)
);

CREATE TABLE categories (
    categoryid SERIAL PRIMARY KEY,
    categoryname VARCHAR(255)
);

CREATE TABLE ideacategories (
    ideaid SERIAL,
    categoryid SERIAL,
    PRIMARY KEY (ideaid, categoryid),
    FOREIGN KEY (ideaid) REFERENCES ideas(ideaid),
    FOREIGN KEY (categoryid) REFERENCES categories(categoryid)
);

CREATE TABLE comments (
    commentid SERIAL PRIMARY KEY,
    ideaid INT,
    userid INT,
    commenttext TEXT,
    commentdate TIMESTAMP,
    isanonymous BOOLEAN,
    FOREIGN KEY (ideaid) REFERENCES ideas(ideaid),
    FOREIGN KEY (userid) REFERENCES users(userid)
);

CREATE TABLE documents (
    documentid SERIAL PRIMARY KEY,
    ideaid INT,
    userid INT,
    documentname VARCHAR(255),
    documentpath VARCHAR(255),
    FOREIGN KEY (ideaid) REFERENCES ideas(ideaid),
    FOREIGN KEY (userid) REFERENCES users(userid)
);

CREATE TABLE closuredates (
    closuredateid SERIAL PRIMARY KEY,
    academicyear VARCHAR(255),
    closuredate TIMESTAMP,
    finalclosuredate TIMESTAMP
);

CREATE TABLE stats (
    statid SERIAL PRIMARY KEY,
    departmentid INT,
    numberofideas INT,
    numberofcomments INT,
    FOREIGN KEY (departmentid) REFERENCES departments(departmentid)
);
8. paste this in prisma/schema.prisma : 
model users {
  userid        Int      @id @default(autoincrement()) @unique // Primary key
  username      String    @unique
  password      String
  email         String    @unique
  roleid        Int
  department    departments @relation(fields: [departmentid], references: [departmentid])
  departmentid  Int
  roles        roles     @relation(fields: [roleid], references: [id])
  ideas         ideas[]    // Relation to ideas model remains the same
  documents     documents[] // Relation to documents model remains the same
  comments      comments[]  // Added relation to Comments model

  @@map("users")
}
// Define the model for the roles table
model roles {
  id          Int       @id @default(autoincrement()) // Primary key
  name        String    @unique
  description String?
  users       users[]
  @@map("roles")
}


// Define the model for the departments table
model departments {
  departmentid  Int       @id @default(autoincrement()) // Primary key
  departmentname String
  users         users[]
  ideas         ideas[]
  @@map("departments")
}


model ideas {
  ideaid           Int      @id @default(autoincrement()) @unique // Primary key
  userid           Int
  user             users   @relation(fields: [userid], references: [userid]) // Foreign key to users table
  departmentid      Int
  department       departments @relation(fields: [departmentid], references: [departmentid])
  closuredateid    Int
  closuredate     closuredates @relation(fields: [closuredateid], references: [closuredateid])
  ideatext         String
  ideatitle        String
  submissiondate  DateTime
  isenabled        Boolean
  isanonymous      Boolean
  isinvestigated   Boolean
  isthumbsup       Int
  isthumbsdown     Int
  ideacategories   ideacategories[]
  documents        documents[]
  comments         comments[]  // Added relation to Comments model

  @@map("ideas")
}


model categories {
  categoryid Int    @id @default(autoincrement()) // Primary key
  categoryname String
  ideacategories ideacategories[]
  @@map("categories")
}


model ideacategories {
  ideaid      Int        // Composite key
  idea        ideas      @relation(fields: [ideaid], references: [ideaid])
  categoryid  Int        // Composite key
  category    categories @relation(fields: [categoryid], references: [categoryid])
    
  @@id([ideaid, categoryid])
  @@map("ideacategories")
}


model documents {
  documentid   Int      @id @default(autoincrement()) // Primary key
  ideaid       Int
  idea         ideas    @relation(fields: [ideaid], references: [ideaid])
  userid       Int
  user         users    @relation(fields: [userid], references: [userid])
  documentname String
  documentpath String

  @@index([ideaid])
  @@map("documents")
}

model closuredates {
  closuredateid   Int       @id @default(autoincrement()) // Primary key
  academicyear    String
  closuredate     DateTime
  finalclosuredate DateTime

  ideas           ideas[] 
     @@map("closuredates")
}
model comments {
  commentid   Int      @id @default(autoincrement()) @unique  // Primary key
  ideaid      Int
  userid      Int
  commenttext  String
  commentdate DateTime @default(now())
  isanonymous Boolean

  idea         ideas   @relation(fields: [ideaid], references: [ideaid]) // Foreign key to ideas table
  user         users   @relation(fields: [userid], references: [userid]) // Foreign key to users table

  @@map("comments")
}
//new instructions

if needed, you need to install npm,nvm,node js 
1. npm install // in terminal
2. npm install prisma --save-dev
2. download pgadmin // for the postgre database
3. create a database in pgadmin
4. go to table inside a database and right click and select script and the select insert script, and paste the create tables  sql  statements in this document
5.go to the .env 
6. "postgresql://postgres:<password>@localhost:5432/<database_name>?schema=public" // in change to suit your postgre database setting
7. npx prisma generate // in the terminal
8. to test run, type,  next dev // in terminal

// if you run into errors, please reach out to me. have a good day