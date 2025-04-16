import connectDB from '../../../lib/mongo';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const SECRET = process.env.JWT_SECRET;

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

    // Find user in the database
    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Compare the password with the hashed password stored in the database
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Create JWT token with user details
    const token = jwt.sign({ userId: user._id, username }, SECRET, { expiresIn: '1h' });

    // Return the token as a response
    return NextResponse.json({ token });
  } catch (error) {
    // Handle any errors
    console.error(error);
    return NextResponse.json({ error: 'An error occurred during login' }, { status: 500 });
  }
}
