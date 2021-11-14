
import nodemailer from 'nodemailer'
import dotenv from 'dotenv';

dotenv.config();


const prepareEmailConfigs = (mailData) => {
  const {
    mailSentTo, mailSubject, contentText, contentHTML,
  } = mailData;
  const { MAIL_NAME, MAIL_PASSWORD } = process.env;

  const mailConfigs = {
    from: 'Mille Services TransPay👻'+ MAIL_NAME,
    to: mailSentTo,
    subject: mailSubject,
    html: contentHTML,
    text: contentText,
  };

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: MAIL_NAME,
      pass: MAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  return { mailConfigs, transporter };
};


const sendEmail = async (mailData) => {
  const { mailConfigs, transporter } = prepareEmailConfigs(mailData);

  let isSent;
  
  try {
    isSent = await transporter.sendMail(mailConfigs, (err, sendResult) => {
      let result;
      if (err) {
        result = false;
      } else if (sendResult) {
        result = true;
      }
      console.log(result);
      return result;
    });
  } catch (err) {
    throw new Error(
      `Something went wrong in the sendmail method. Error: ${err.message}`,
    );
  }
  return isSent;
};

export default sendEmail;