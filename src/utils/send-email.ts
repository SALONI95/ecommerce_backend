import nodemailer from "nodemailer";
import hbs, {
  HbsTransporter,
  NodemailerExpressHandlebarsOptions,
} from "nodemailer-express-handlebars";
import path from "path";
const transporter: HbsTransporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 25,
  secure: false,
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const hbsOptions: NodemailerExpressHandlebarsOptions = {
  viewEngine: {
    defaultLayout: false,
  },
  viewPath: path.resolve("./src/views"),
};
transporter.use("compile", hbs(hbsOptions));

function sendEmail(email: any, subject: string, template: any, context: any) {
  return transporter.sendMail(
    {
      from: "loomina.com", // give ur website name
      to: "gowadiasaloni@gmail.com",
      subject,
      template,
      context,
    },
    function (err, info) {
      if (err) {
        console.log(err);
      }
    }
  );
}

export { sendEmail };
