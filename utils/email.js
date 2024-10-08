require("dotenv").config();
const sgMail = require("@sendgrid/mail");

const sendEmail = async (email, subject, link) => {
  console.log(process.env.SENDGRID_API_KEY);
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: email, // Change to your recipient
    from: process.env.MAIL_USERNAME, // Change to your verified sender
    subject: subject,
    html: link,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = {
  sendEmail,
};
