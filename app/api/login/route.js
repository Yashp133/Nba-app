import { connectDB } from '@/lib/mongo';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  const { username, password } = await req.json();
  await connectDB();

  const user = await User.findOne({ username });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return NextResponse.json({ error: 'Wrong password' }, { status: 401 });

  const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
  return NextResponse.json({ token });
}
