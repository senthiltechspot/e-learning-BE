import { Resend } from "resend";

export const sendMail = async (to, subject, html) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      html,
    });

    console.log("Email sent successfully");
    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
};
