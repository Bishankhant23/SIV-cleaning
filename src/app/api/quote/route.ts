import { NextResponse } from 'next/server';
import { sendQuoteNotification, sendCustomerConfirmation } from '@/lib/mail';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.phone || !data.email) {
      return NextResponse.json(
        { error: 'Name, phone, and email are required.' },
        { status: 400 }
      );
    }

    console.log('[New Quote Request Received]:', {
      name: data.name,
      email: data.email,
      phone: data.phone,
      service: data.service,
      suburb: data.suburb,
      frequency: data.frequency,
      message: data.message,
      receivedAt: new Date().toISOString()
    });

    // Send email notification to business owner
    const emailResult = await sendQuoteNotification({
      name: data.name,
      email: data.email,
      phone: data.phone,
      service: data.service,
      suburb: data.suburb,
      frequency: data.frequency,
      message: data.message
    });

    // Send confirmation receipt to the customer asynchronously
    sendCustomerConfirmation({
      name: data.name,
      email: data.email,
      phone: data.phone,
      service: data.service,
      suburb: data.suburb,
    }).catch(err => console.error('Failed to dispatch customer confirmation email:', err));

    return NextResponse.json(
      {
        success: true,
        message: 'Quote request received successfully!',
        emailSent: emailResult.success
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing quote request:', error);
    return NextResponse.json(
      { error: 'Failed to process request.' },
      { status: 500 }
    );
  }
}
