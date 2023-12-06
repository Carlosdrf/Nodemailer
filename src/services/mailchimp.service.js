import mailchimp from "@mailchimp/mailchimp_marketing";
require("dotenv").config();

export const mailchimpConfig = () => {
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: "us14",
  });
};
