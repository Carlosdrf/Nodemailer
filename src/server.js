import webhookRoute from "./routes/mailchimp.webhook.routes.js";
import emailRoute from "./routes/email.routes.js";
import mailchimpRoute from './routes/mailchimp.routes.js'

import { mailchimpConfig } from "./services/mailchimp.service";
mailchimpConfig();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const host = "localhost";

const PORT = 3000;
dotenv.config();

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json())
app.use(cors());

app.use("/api/webhook", webhookRoute);
app.use("/api/email", emailRoute);
app.use("/api/mailchimp", mailchimpRoute);

app.listen(PORT, host, () => {
  console.log(`Server running on port ${PORT}`);
});
