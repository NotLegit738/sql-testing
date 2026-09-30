import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { applicationSchema } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validatedData = applicationSchema.parse(body);

    const checkDuplicateSQL = 'SELECT id FROM staff_applications WHERE email = ?';
    const existing = await query(checkDuplicateSQL, [validatedData.email]);
    
    if (Array.isArray(existing) && existing.length > 0) {
      return NextResponse.json(
        { error: 'An application with this email already exists' },
        { status: 400 }
      );
    }

    const insertSQL = `
      INSERT INTO staff_applications (
        full_name, email, discord_username, age, country, timezone, position,
        staff_experience, hosting_experience, why_join, why_select, contribution,
        availability, hours_per_week, previous_positions, additional_information, agreement
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await query(insertSQL, [
      validatedData.fullName,
      validatedData.email,
      validatedData.discordUsername,
      validatedData.age,
      validatedData.country,
      validatedData.timezone,
      validatedData.position,
      validatedData.staffExperience || null,
      validatedData.hostingExperience || null,
      validatedData.whyJoin,
      validatedData.whySelect,
      validatedData.contribution,
      validatedData.availability,
      validatedData.hoursPerWeek,
      validatedData.previousPositions || null,
      validatedData.additionalInformation || null,
      validatedData.agreement,
    ]);

    return NextResponse.json(
      { message: 'Application submitted successfully' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Application submission error:', error);
    
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}
