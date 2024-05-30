import { APIGatewayProxyHandler } from 'aws-lambda';
import { addContact } from './mailingService';

export const handler: APIGatewayProxyHandler = async (event) => {
  const { name, email } = JSON.parse(event.body || '{}');

  if (!name || !email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Name and email are required' }),
    };
  }

  try {
    await addContact({ name, email });

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
