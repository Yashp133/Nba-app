import { connectDB } from '@/lib/mongo';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { username, password } = await req.json();
  await connectDB();

  const existing = await User.findOne({ username });
  if (existing) {
    return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashed });

  return NextResponse.json({ message: 'User created', user: { username: user.username } });
}
