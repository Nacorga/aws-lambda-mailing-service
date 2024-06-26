import { Resend } from 'resend';

export const addContact = async (email: string) => {
  const resend: Resend = new Resend(process.env.RESEND_API_KEY || '');

  await resend.contacts.create({
    email,
    unsubscribed: false,
    audienceId: process.env.RESEND_AUDIENCE_ID || '',
  });
}