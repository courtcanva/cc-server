import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
// Create SES service object.
const sesClient = new SESClient({
  region: process.env.REGION,
  //   credentials: {
  //     accessKeyId: process.env.accessKeyId,
  //     secretAccessKey: process.env.secretAccessKey,
  //   },
});

export const sendEmail = async (email, otp) => {
  // Set the parameters
  const params = {
    Destination: {
      /* required */
      CcAddresses: [
        /* more items */
      ],
      ToAddresses: [
        email, //RECEIVER_ADDRESS
        /* more To-email addresses */
      ],
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: "UTF-8",
          Data: `<p>Enter <b>${otp}</b> in the website to verify your email address and complete the sign up.</p><p>This code <b>expires in 15 min</b>.</p>`,
        },
        Text: {
          Charset: "UTF-8",
          Data: "TEXT_FORMAT_BODY",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Verify your email",
      },
    },
    Source: process.env.SOURCE_EMAIL, // SENDER_ADDRESS
    ReplyToAddresses: [
      /* more items */
    ],
  };
  try {
    const data = await sesClient.send(new SendEmailCommand(params));
    return { status: "Success", data };
  } catch (err) {
    return { status: "Error", err };
  }
};
