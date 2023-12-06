import { Router } from "express";
import mailchimp from "@mailchimp/mailchimp_marketing";
const md5 = require("md5");

const router = Router();

router.post("/", async (req, res) => {
  const email = req.body.email;
  let tags = req.body.tags;
  const subscriber_hash = md5(email.toLowerCase());
  try {
    const response = await mailchimp.lists.getListMember(
      process.env.LIST_ID,
      subscriber_hash
    );
    if (response) {
      await mailchimp.lists.updateListMemberTags(
        process.env.LIST_ID,
        subscriber_hash,
        {
          tags: tags.map((tag) => ({ name: tag, status: "active" })),
        }
      );
      console.log("updated");
      res.json({ message: "Successfully updated" });
    }
  } catch (error) {
    try {
      console.log("tryin to add");
      await mailchimp.lists.addListMember(process.env.LIST_ID, {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: req.body.name,
          LNAME: req.body.last_name,
          PHONE: req.body.phone,
        },
      });
      await mailchimp.lists.updateListMemberTags(
        process.env.LIST_ID,
        subscriber_hash,
        {
          tags: tags.map((tag) => ({ name: tag, status: "active" })),
        }
      );
      console.log("added");
      res.json({ message: "Subscriber added successfully" });
    } catch (error) {
      console.log("imposible to add this user");
      res.json({ message: "user permanently deleted" });
    }
  }
});
export default router;
