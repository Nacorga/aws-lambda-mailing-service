import { APIGatewayProxyHandler } from 'aws-lambda';
import { addContact } from './mailingService';

const headers = { 
  'Access-Control-Allow-Origin': '*', 
  'Content-Type': 'application/json',
};

export const handler: APIGatewayProxyHandler = async (event) => {
  const { email }: { email: string } = JSON.parse(event.body || '{}');

  if (!email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Name and email are required' }),
      headers
    };
  }

  try {
    await addContact(email);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Contact added successfully' }),
      headers
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to add contact', error: error.message }),
      headers
    };
  }
};
