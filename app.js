const nodemailer = require('nodemailer'); 
const sendMail = require('./sendMail');
const logger = require('./logger');
const accontDetails = require('./mailAccount');
const mailDetails = require('./messageDetail');
const mailTransporter = nodemailer.createTransport(accontDetails); 
const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
  path: 'error.csv',
  header: [
    {id: 'First Name', title: 'First Name'},
    {id: 'Last name', title: 'Last name'},
    {id: 'email', title: 'email'},
    {id: 'error', title: 'Error'},
  ]
});




fs.createReadStream('./test.csv')
  .pipe(csv())
  .on('data', (row) => {
   const reciverEmail = row.email;
    mailDetails.from = accontDetails.auth.user;
    mailDetails.to = reciverEmail;
    try{
         sendMail(mailTransporter,mailDetails);   
    }catch(err){
        row.error = err;
        csvWriter
           .writeRecords(row);
        logger.error(`Error While send mail to  ${mailDetails.to} ${err}`);
    }
  })
  .on('end', () => {
    console.log('Mail Send SuccessFully');
  });