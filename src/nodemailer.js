import nodemailer from "nodemailer";
require('dotenv').config()

const transport = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  auth: {
    user: process.env.EMAILFROM,
    pass: process.env.EMAILPASS,
  },
});
transport.verify((error, next) => {
  if (error) {
    console.error(error);
  } else {
    console.log(next);
    console.log("Server is ready to take our messages");
  }
});

export default transport;
