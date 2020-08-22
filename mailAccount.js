const accountDetails = { 
    pool:true,
    host: "smtp.mail.yahoo.com",
    port: 587,
    service: 'yahoo',
    secure: false,
    auth: {
        user: 'youremailid',
        pass: 'yourpasword'
    },
    debug: false,
    logger: true
};
module.exports = accountDetails;