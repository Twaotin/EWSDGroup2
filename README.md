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


steps
1. git clone the application to a folder in your computer
2. create the database with the tables below in postgre pg admin
3. edit the .env file to match the database details, more details at the end
4. open the project in vscode and open the terminal and enter "npm install"
5. After succesful npm install enter "npm rum dev"


user details:
deptman9@gmail.com - hashed_password_4
deptman861@gmail.com - hashed_password_3
deptman419@gmail.com - hashed_password_2            -
deptman7@gmail.com - hashed_password_1              -
staffuser300@gmail.com - hashed_password_6
staffuser98@gmail.com -  password9
ideaapp16@gmail.com - admin123
johntravi181@gmail.com - qamanager123

//
INSERT INTO roles (name, description)
VALUES
    ('Admin', 'Administrator role with full access privileges'),
    ('QADeptment Coordinator', 'Coordinator role for the QA department'),
    ('QA Manager', 'Manager role for the QA department'),
    ('staff', 'Regular staff role with limited privileges');

INSERT INTO departments (departmentname)
VALUES
    ('Human Resource'),
    ('Finance'),
    ('Marketing'),
    ('Information Technology'),
	('Admin');

INSERT INTO categories (categoryname)
VALUES
    ('Human Resource'),
    ('Finance'),
    ('Marketing'),
    ('Information Technology');

INSERT INTO ideadates (academicyear, opendate, closuredate, finalclosuredate)
VALUES
    ('2023-2024', '2023-07-15'::TIMESTAMP, '2023-11-25'::TIMESTAMP, '2023-12-10'::TIMESTAMP),
    ('2023-2024', '2024-02-15'::TIMESTAMP, '2024-05-31'::TIMESTAMP, '2024-06-10'::TIMESTAMP);

///


INSERT INTO users (username, password, email, roleid, departmentid, isactive, lastlogin, passwordreset, passwordresetexpire)
VALUES
  ('deptman7', '$2a$10$1YRLfFXOZhpt1y/.dkxn0.RcxNTGeZ3rruzQa3o5UMC3pQdq2ooSa', 'deptman7@gmail.com', 2, 1, true, CURRENT_TIMESTAMP, null, null),
  ('deptman419', '$2a$10$i63PfEhmzI4ONOGakmIg6.13PlYyHiuyHGSdahVi8BVW4o3cxEX8q', 'deptman419@gmail.com', 2, 2, true, CURRENT_TIMESTAMP, null, null),
  ('deptman861', '$2a$10$ZWe/M1RwPfDp.nIWwpLxLuiLgaJKGeJZxqm81FoZ2J6JuPsSRc21.', 'deptman861@gmail.com', 2, 3, true, CURRENT_TIMESTAMP, null, null),
  ('deptman9', '$2a$10$wmaFAQbWpppTpnXmek.48.ufNzZTBc5fFllnk7ulWnhMZG2WZwlyW', 'deptman9@gmail.com', 2, 4, true, CURRENT_TIMESTAMP, null, null),
  ('staffuser300', '$2a$10$fOq2bVGmj8cEqYROZ15Ms.098RHYdqV/QVQqAX3TkEJ9iwhiT5/qm', 'staffuser300@gmail.com', 4, 1, true, CURRENT_TIMESTAMP, null, null),
  ('staffuser98', '$2a$10$y78yNG.cuwOgQMTNygOA.O20yTJPZ2c1eIVXl.ZCrC5qRMwPRjFli', 'staffuser98@gmail.com', 4, 2, true, CURRENT_TIMESTAMP, null, null),
 ('admin', '$2a$10$0.ik49N7KAHyE.lchPNlOuvGDRl6T7H43biT7Eqjggafi/qCdzmbC', 'ideaapp16@gmail.com', 1, 5, true, CURRENT_TIMESTAMP,null, null),
('qamanager', '$2a$10$2c2lgtTMYNTA6FT2UG6S7Ozwx0vpInmLkEnmMyKGlVMjFsOKg4FSy', 'johntravi181@gmail.com', 3, 5, true, CURRENT_TIMESTAMP,null, null);
  
CREATE TABLE users (
    userid SERIAL PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255), -- hashed password
    email VARCHAR(255),
    roleid INT,
    departmentid INT, -- New column for linking to departments
    isactive BOOLEAN,
    lastLogin TIMESTAMP,
    passwordreset VARCHAR(255) DEFAULT NULL,
    passwordresetexpire TIMESTAMP DEFAULT NULL,
    FOREIGN KEY (roleid) REFERENCES roles(id) ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY (departmentid) REFERENCES departments(departmentid) ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE TABLE ideas (
    ideaid SERIAL PRIMARY KEY,
    userid INT,
    departmentid INT,
    closuredateid INT,
    ideatext TEXT,
    submissiondate TIMESTAMP,
    isclosure BOOLEAN,
    isfinalclosure BOOLEAN,
    isanonymous BOOLEAN,
    ideatitle TEXT,
    FOREIGN KEY (userid) REFERENCES users(userid) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (departmentid) REFERENCES departments(departmentid) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (closuredateid) REFERENCES ideadates(closuredateid) ON UPDATE CASCADE ON DELETE CASCADE
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

CREATE TABLE categories (
    categoryid SERIAL PRIMARY KEY,
    categoryname VARCHAR(255)
);

CREATE TABLE ideacategories (
    ideaid SERIAL,
    categoryid SERIAL,
    PRIMARY KEY (ideaid, categoryid), 
    FOREIGN KEY (ideaid) REFERENCES ideas(ideaid) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (categoryid) REFERENCES categories(categoryid) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE comments (
    commentid SERIAL PRIMARY KEY,
    ideaid INT,
    userid INT,
    commenttext TEXT,
    commentdate TIMESTAMP,
    isanonymous BOOLEAN,
    FOREIGN KEY (ideaid) REFERENCES ideas(ideaid) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (userid) REFERENCES users(userid) ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE ideadates (
    closuredateid SERIAL PRIMARY KEY,
    academicyear VARCHAR(255),    
	opendate TIMESTAMP,
    closuredate TIMESTAMP,
    finalclosuredate TIMESTAMP
);

CREATE TABLE ideaviews (
    ideaviewid SERIAL PRIMARY KEY,
    ideaid INT NOT NULL,
    userid INT NOT NULL,
    FOREIGN KEY (ideaid) REFERENCES ideas(ideaid) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (userid) REFERENCES users(userid) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE ideathumbup (
    ideathumbupid SERIAL PRIMARY KEY,
    ideaid INT NOT NULL,
    userid INT NOT NULL,
    FOREIGN KEY (ideaid) REFERENCES ideas(ideaid) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (userid) REFERENCES users(userid) ON UPDATE CASCADE ON DELETE CASCADE
);


CREATE TABLE ideathumbdown (
    ideathumbdownid SERIAL PRIMARY KEY,
    ideaid INT NOT NULL,
    userid INT NOT NULL,
    FOREIGN KEY (ideaid) REFERENCES ideas(ideaid) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (userid) REFERENCES users(userid) ON UPDATE CASCADE ON DELETE CASCADE
);




CREATE TABLE ideareports (
    reportid SERIAL PRIMARY KEY,
    ideaid INT NOT NULL,
    userid INT NOT NULL,
    reportdate TIMESTAMP NOT NULL,
    reporttext TEXT NOT NULL,
    reportsubject TEXT NOT NULL,
    reviewstatus VARCHAR(255),
    reviewer VARCHAR(255),
    FOREIGN KEY (ideaid) REFERENCES ideas(ideaid) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (userid) REFERENCES users(userid) ON UPDATE CASCADE ON DELETE CASCADE
);




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