// const nodemailer = require('nodemailer');
// const handlebars = require('nodemailer-handlebars');
// const path = require('path');
// require('dotenv').config();

// // Nodemailer transporter
// const transporter = nodemailer.createTransport({
//     service: 'gmail', 
//     auth: {
//         user: process.env.EMAIL_USER, 
//         pass: process.env.EMAIL_PASS, 
//     }
// });

// // Configure Handlebars
// const handlebarOptions = {
//     viewEngine: {
//         extName: '.hbs',
//         partialsDir: path.resolve(__dirname, '../views/'), 
//         defaultLayout: false,
//     },
//     viewPath: path.resolve(__dirname, '../views/'), 
//     extName: '.hbs',
// };

// // Attach handlebars plugin to nodemailer
// transporter.use('compile', handlebars(handlebarOptions));

// // Email sending function
// const sendMail = async (to, subject, template, context) => {
//     const currentYear = new Date().getFullYear(); 
//     context.currentYear = currentYear;
//     const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to,
//         subject,
//         template,
//         context, 
//         attachments: [
//             {
//                 filename: 'password.png', 
//                 path: path.join(__dirname, '../public/images/password.png'), 
//                 cid: 'passwordImage' 
//             }
//         ]
//     };
//     return transporter.sendMail(mailOptions);
// };

// module.exports = { sendMail };