import { Router } from "express";
import { mailService } from "../services/email.service";

const router = Router();

router.post("/", async (req, res) => {
  let { name, tel, message, email, subject } = req.body;
  subject = `${subject} | alboradahouse.com`;
  let data = {
    subject,
    email
  }
  const content = `<p>Nombre: ${name} </p><p> Telefono: ${tel}</p><p> Correo: ${email}</p><p> Mensaje: ${message}</p><br><br><p>This e-mail was sent from the contact form on Alborada House (<a href="https://alboradahouse.com">alboradahouse.com</a>)</p>`;
  const response = await mailService(content, data, process.env.EMAILTO);
  if (response !== false) {
    console.log(response);
    res.json("Sent");
  } else {
    res.status(400).json(response);
  }
});
export default router;
