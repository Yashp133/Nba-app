import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import connectDB from '../../../../lib/mongo';
import User from '../../../../models/User';

export async function GET(req) {
    await connectDB();
  
    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  
    try {
      const decoded = verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ username: decoded.username });
      if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  
      return NextResponse.json({
        games: user.favorites.games || [],
        players: user.favorites.players || [],
        teams: user.favorites.teams || []
      });
    } catch {
      return NextResponse.json({ error: 'Token invalid or expired' }, { status: 403 });
    }
}