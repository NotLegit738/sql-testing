import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(
  process.env.SESSION_SECRET || 'fallback-secret-key-change-in-production'
);

// Hash admin password at startup
let hashedAdminPassword: string | null = null;

async function initAdminPassword() {
  const plainPassword = process.env.ADMIN_PASSWORD || '';
  if (plainPassword && !hashedAdminPassword) {
    hashedAdminPassword = await bcrypt.hash(plainPassword, 12);
  }
}

// Initialize on module load
initAdminPassword();

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function createToken(email: string): Promise<string> {
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET_KEY);
  return token;
}

export async function verifyToken(token: string): Promise<{ email: string } | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as { email: string };
  } catch (error) {
    return null;
  }
}

export async function getAdminCredentials() {
  // Ensure password is hashed before returning
  if (!hashedAdminPassword) {
    await initAdminPassword();
  }
  return {
    email: process.env.ADMIN_EMAIL || 'admin@caspian.host',
    password: hashedAdminPassword || ''
  };
}
