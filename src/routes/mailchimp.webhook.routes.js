import { Router } from "express";
require("dotenv").config();
import mailchimp from "@mailchimp/mailchimp_marketing";
import { mailService } from "../services/email.service";
import cheerio from "cheerio";

const router = Router();

router.get("/", async (req, res) => {
  const response = await mailchimp.campaigns.list({ count: 21 });
  res.json(response);
});

router.get("/campaign/content", async (req, res) => {
  const response = await mailchimp.campaigns.getContent("42e07b7b2b");
  const body = await mailchimp.campaigns.get("42e07b7b2b");
  const data = {
    subject: body.settings.subject_line,
    email: process.env.EMAIL_FOR_POST
    
  };
  const $ = cheerio.load(response.archive_html)

  let templateContent = $("#root table table table table tbody")
  let sections = templateContent.find('tr');

  sections.each((i, element)=>{
    if(i !== 0 && i !== 1){
      $(element).remove();
    }
  })
  await mailService($.html(), data, process.env.EMAIL_FOR_POST);

  res.send($.html());
});
export default router;
