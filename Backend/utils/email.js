const nodemailer = require("nodemailer");

const Sendemail=async (option) => {
    const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.PORT_EMAIL,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
      });
      
      const mailOption={
         from:'imhuda76@gmail.com',
          to:option.to,
          subject:option.subject,
          message:option.message
      }
      await transporter.sendMail(mailOption)
}
module.exports=Sendemail