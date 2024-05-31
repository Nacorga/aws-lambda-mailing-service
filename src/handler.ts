import { APIGatewayProxyHandler } from 'aws-lambda';
import { addContact } from './mailingService';

export const handler: APIGatewayProxyHandler = async (event) => {
  const { email }: { email: string } = JSON.parse(event.body || '{}');

  if (!email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Name and email are required' }),
    };
  }

  try {
    await addContact(email);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Contact added successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to add contact', error: error.message }),
    };
  }
};
