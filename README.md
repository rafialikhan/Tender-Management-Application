# mean-stack-tender-management-example

The Project is a tender management application which uses nodejs,angularjs and mongodb.
It uses token based authentication for users.
A user can only access his/her account when he/she I verified by the admin with proper proof of documents Users are verified via email.
Users are verified via admin
Only verified contractors are allowed to fill tenders.
All the tenders are sorted and can be categorised by the basis of their bid, contractor name , timeline etc.
2-Layers of approval are followed first tenders are approved via PWD and then by GOVT. officials.
Once a tender is approved an email is sent to the contractor informing him about the approval of tender.

First install npm and node.
To run this projects copy the folder then go into the directory.
Go to the cmd or terminal and do an npm install.
First start the mongodb server then run the application via doing a node server command at the terminal.

The types of users are,
Contractor,
Pwd,
Govt.

For verifying a user,
To show unverified users do a node showunverifiedusers
To verify a user do node verifyuser

For more info drop a mail at rahul.gautam21@gmail.com
