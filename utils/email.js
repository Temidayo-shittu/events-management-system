const nodemailer= require('nodemailer')

const transporter= nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    //port: process.env.EMAIL_PORT,
     auth:{
         user: '9f3c9fea2c5d84',
         pass: '0173b2af7ef1d9'
     }
    })

    const options= {
        from: '9f3c9fea2c5d84',
        to: 'temidayo@gmail.com',
        subject: 'Sending email with node js',
        text: 'Successfully logged in!!'
    }

    transporter.sendMail(options,(err,info)=>{
        if(err) return console.error(err)
        console.log(info.response)
    })


/*
const sendEmail= async options=>{
    //create transporter
    const transporter= nodemailer.createTransport({
       host: 'sandbox.smtp.mailtrap.io',
       //port: process.env.EMAIL_PORT,
        auth:{
            user: '9f3c9fea2c5d84',
            pass: '0173b2af7ef1d9'
        }
    })

    //define mail options
    const mailOptions= {
        from:'Temidayo <temidayo@gmail.com>',
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    //actually send the mail
    await transporter.sendMail(mailOptions)

}

module.exports= sendEmail
*/