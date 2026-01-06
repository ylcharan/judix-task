import { NextRequest } from 'next/server';
import { z } from 'zod';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { authenticate, createErrorResponse, createSuccessResponse } from '@/lib/middleware';

// Validation schema for profile update
const updateProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name is too long').optional(),
  bio: z.string().max(500, 'Bio cannot exceed 500 characters').optional(),
  avatar: z.string().url('Invalid avatar URL').optional(),
});

// GET /api/profile - Get user profile
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticate(request);
    if (authResult instanceof Response) {
      return authResult;
    }

    const { user } = authResult;

    // Connect to database
    await connectDB();

    // Find user
    const userData = await User.findById(user.userId);
    if (!userData) {
      return createErrorResponse('User not found', 404);
    }

    return createSuccessResponse({
      user: {
        id: userData._id,
        email: userData.email,
        name: userData.name,
        bio: userData.bio,
        avatar: userData.avatar,
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt,
      },
    });
  } catch (error: any) {
    console.error('Get profile error:', error);
    return createErrorResponse(
      error.message || 'An error occurred while fetching profile',
      500
    );
  }
}

// PUT /api/profile - Update user profile
export async function PUT(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticate(request);
    if (authResult instanceof Response) {
      return authResult;
    }

    const { user } = authResult;

    const body = await request.json();

    // Validate input
    const validationResult = updateProfileSchema.safeParse(body);
    if (!validationResult.success) {
      return createErrorResponse(
        validationResult.error.issues[0].message,
        400
      );
    }

    // Connect to database
    await connectDB();

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      user.userId,
      { $set: validationResult.data },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return createErrorResponse('User not found', 404);
    }

    return createSuccessResponse({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        name: updatedUser.name,
        bio: updatedUser.bio,
        avatar: updatedUser.avatar,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      },
    });
  } catch (error: any) {
    console.error('Update profile error:', error);
    return createErrorResponse(
      error.message || 'An error occurred while updating profile',
      500
    );
  }
}
