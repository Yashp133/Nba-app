// /api/signup/route.js
import { connectDB } from '@/lib/mongo';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { username, password } = await req.json();
  await connectDB();

  const exists = await User.findOne({ username });
  if (exists) return NextResponse.json({ error: 'User already exists' }, { status: 400 });

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashed });
  await user.save();

  return NextResponse.json({ message: 'User created' });
}
