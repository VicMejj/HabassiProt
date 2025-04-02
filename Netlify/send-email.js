// netlify/functions/send-email.js
import { SMTPClient } from 'emailjs';

export async function handler(event) {
  const client = new SMTPClient({
    host: process.env.SMTP_HOST,
    port: 587,
    ssl: false,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD
  });

  try {
    const data = JSON.parse(event.body);
    
    await client.sendAsync({
      text: data.message,
      from: data.from_email,
      to: 'your@email.com',
      subject: `Message from ${data.from_name}`
    });

    return { statusCode: 200, body: 'Success' };
  } catch (error) {
    return { statusCode: 500, body: error.message };
  }
}