import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { comparePassword, generateToken } from '@/lib/auth';
import { createErrorResponse, createSuccessResponse } from '@/lib/middleware';

// Validation schema
const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validationResult = loginSchema.safeParse(body);
    if (!validationResult.success) {
      return createErrorResponse(
        validationResult.error.issues[0].message,
        400
      );
    }

    const { email, password} = validationResult.data;

    // Connect to database
    await connectDB();

    // Find user by email
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return createErrorResponse('Invalid email or password', 401);
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return createErrorResponse('Invalid email or password', 401);
    }

    // Generate JWT token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
    });

    // Return user data without password
    const userData = {
      id: user._id,
      email: user.email,
      name: user.name,
      bio: user.bio,
      avatar: user.avatar,
      createdAt: user.createdAt,
    };

    return createSuccessResponse({
      message: 'Login successful',
      token,
      user: userData,
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return createErrorResponse(
      error.message || 'An error occurred during login',
      500
    );
  }
}
