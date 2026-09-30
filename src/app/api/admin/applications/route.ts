import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

async function verifyAuth(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  if (!token) return null;
  
  const payload = await verifyToken(token);
  return payload;
}

export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAuth(request);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const position = searchParams.get('position') || '';
    const sort = searchParams.get('sort') || 'newest';

    let sql = `
      SELECT id, full_name, email, discord_username, position, country, status, created_at
      FROM staff_applications
      WHERE 1=1
    `;
    const params: any[] = [];

    if (search) {
      sql += ` AND (full_name LIKE ? OR email LIKE ? OR discord_username LIKE ?)`;
      const searchPattern = `%${search}%`;
      params.push(searchPattern, searchPattern, searchPattern);
    }

    if (status) {
      sql += ` AND status = ?`;
      params.push(status);
    }

    if (position) {
      sql += ` AND position = ?`;
      params.push(position);
    }

    sql += ` ORDER BY created_at ${sort === 'oldest' ? 'ASC' : 'DESC'}`;

    const results = await query(sql, params);

    return NextResponse.json({ applications: results });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}
