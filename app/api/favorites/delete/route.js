import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import connectDB from '../../../../lib/mongo';
import User from '../../../../models/User';

export async function POST(req) {
  try {
    await connectDB();

    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = verify(token, process.env.JWT_SECRET);
    const { category, itemId } = await req.json();

    const user = await User.findOne({ username: decoded.username });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    user.favorites[category] = user.favorites[category].filter(fav => fav.id !== itemId);
    await user.save();

    return NextResponse.json({ message: 'Removed from favorites' });
  } catch (err) {
    console.error('❌ Error removing favorite:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
