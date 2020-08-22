const logger = require('./logger');
module.exports= function(mailTransporter,mailDetails){
    return new Promise(function(resolve,reject){
        mailTransporter.sendMail(mailDetails, function(err, data) { 
            if(err) { 
               logger.info('[sendMail]::Error for mail id',mailDetails.to); 
               reject(err);
            } else { 
                 resolve('send mail');
            } 
        });
    }) ;
};