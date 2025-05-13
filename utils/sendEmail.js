import nodemailer from 'nodemailer';

const sendEmail = async ({to, subject, text}) => {
    // Create a transporter object using the default SMTP transport 
    // Trasporter is a service that sends the email
    // You can use any email service provider like Gmail, SendGrid, etc.
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        }
    });

    // Send mail with defined transport object
    await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to,
        subject,
        text,
    });
    console.log(`Email sent to ${to} with subject: ${subject}`);
};
export default sendEmail;