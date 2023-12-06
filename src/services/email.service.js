import transport from "../nodemailer";

export const mailService = async (content, data, emailto) => {
  const { subject, email } = data;
  try {
    await transport.sendMail(
      {
        from: process.env.EMAILFROM,
        to: emailto,
        subject,
        html: content,
        replyTo: email,
        
      },
      (error, next) => {
        if (error) {
          return error;
        } else {
          console.log("Email sent: " + next.response);
          return true;
        }
      }
    );
  } catch (error) {
    // console.error(error);
    return false;
  }
};
