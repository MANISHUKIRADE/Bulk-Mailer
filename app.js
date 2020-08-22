const nodemailer = require('nodemailer'); 
const sendMail = require('./sendMail');
const logger = require('./logger');
const accontDetails = require('./mailAccount');
// const mailDetails = require('./messageDetail');
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
   const mailDetails = { 
        from: accontDetails.auth.user, 
        to: reciverEmail, 
        subject: 'Test mail send csv', 
        text: 'Node.js testing mail for GeeksforGeeks'
    };
    try{
         sendMail(mailTransporter,mailDetails);   
    }catch(err){
        row.error = err;
        csvWriter
           .writeRecords(row)
           .then(logger.info('Error',err));
    }
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });
/*
const mailDetails = { 
    from: 'manishukirade@yahoo.com', 
    to: 'ukirdemanish9797@gmail.com', 
    subject: 'Test mail', 
    text: 'Node.js testing mail for GeeksforGeeks'
};
async function sendingMail(){
   const data = await sendMail(mailTransporter,mailDetails);
   logger.info('>>>>>>>>>>>>>>>>>>>>>>>>>',data);
}
sendingMail();
*/