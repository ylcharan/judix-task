import { NextRequest } from 'next/server';
import { z } from 'zod';
import connectDB from '@/lib/db';
import Task from '@/models/Task';
import { authenticate, createErrorResponse, createSuccessResponse } from '@/lib/middleware';

// Validation schema for task update
const updateTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long').optional(),
  description: z.string().max(1000, 'Description is too long').optional(),
  status: z.enum(['todo', 'in-progress', 'completed']).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
});

// GET /api/tasks/[id] - Get single task
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate user
    const authResult = await authenticate(request);
    if (authResult instanceof Response) {
      return authResult;
    }

    const { user } = authResult;
    const { id } = await params;

    // Connect to database
    await connectDB();

    // Find task
    const task = await Task.findOne({ _id: id, userId: user.userId });
    if (!task) {
      return createErrorResponse('Task not found', 404);
    }

    return createSuccessResponse({ task });
  } catch (error: any) {
    console.error('Get task error:', error);
    return createErrorResponse(
      error.message || 'An error occurred while fetching task',
      500
    );
  }
}

// PUT /api/tasks/[id] - Update task
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate user
    const authResult = await authenticate(request);
    if (authResult instanceof Response) {
      return authResult;
    }

    const { user } = authResult;
    const { id } = await params;

    const body = await request.json();

    // Validate input
    const validationResult = updateTaskSchema.safeParse(body);
    if (!validationResult.success) {
      return createErrorResponse(
        validationResult.error.issues[0].message,
        400
      );
    }

    // Connect to database
    await connectDB();

    // Update task
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: user.userId },
      { $set: validationResult.data },
      { new: true, runValidators: true }
    );

    if (!task) {
      return createErrorResponse('Task not found', 404);
    }

    return createSuccessResponse({
      message: 'Task updated successfully',
      task,
    });
  } catch (error: any) {
    console.error('Update task error:', error);
    return createErrorResponse(
      error.message || 'An error occurred while updating task',
      500
    );
  }
}

// DELETE /api/tasks/[id] - Delete task
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Authenticate user
    const authResult = await authenticate(request);
    if (authResult instanceof Response) {
      return authResult;
    }

    const { user } = authResult;
    const { id } = await params;

    // Connect to database
    await connectDB();

    // Delete task
    const task = await Task.findOneAndDelete({ _id: id, userId: user.userId });
    if (!task) {
      return createErrorResponse('Task not found', 404);
    }

    return createSuccessResponse({
      message: 'Task deleted successfully',
    });
  } catch (error: any) {
    console.error('Delete task error:', error);
    return createErrorResponse(
      error.message || 'An error occurred while deleting task',
      500
    );
  }
}
