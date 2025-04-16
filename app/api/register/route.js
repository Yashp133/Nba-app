import connectDB from '../../../lib/mongo';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Parsing request body
    const { username, password } = await req.json();

    // Input validation
    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    // Connect to the database
    await connectDB();

    // Check if the user already exists
    const exists = await User.findOne({ username });
    if (exists) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const user = new User({ username, password: hashedPassword });
    await user.save();

    // Return success message
    return NextResponse.json({ message: 'User created successfully' });
  } catch (error) {
    // Handle any errors
    console.error(error);
    return NextResponse.json({ error: 'An error occurred during registration' }, { status: 500 });
  }
}
