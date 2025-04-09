import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import connectDB from '../../../../lib/mongo';
import User from '../../../../models/User';


export async function POST(req) {
  try {
    await connectDB();

    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Missing token' }, { status: 401 });
    }

    const decoded = verify(token, process.env.JWT_SECRET);
    const { category, item } = await req.json();

    const user = await User.findOne({ username: decoded.username });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (!user.favorites[category]) {
      user.favorites[category] = [];
    }
    
    const exists = user.favorites[category].some(fav => fav.id === item.id);
    if (!exists) {
      user.favorites[category].push(item);
      await user.save();
    }    

    return NextResponse.json({ message: 'Added to favorites' }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
