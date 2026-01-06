import { NextRequest } from 'next/server';
import { z } from 'zod';
import connectDB from '@/lib/db';
import Task from '@/models/Task';
import { authenticate, createErrorResponse, createSuccessResponse } from '@/lib/middleware';

// Validation schema for task creation/update
const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
  description: z.string().max(1000, 'Description is too long').optional(),
  status: z.enum(['todo', 'in-progress', 'completed']).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
});

// GET /api/tasks - Get all tasks for authenticated user
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

    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');

    // Build query
    const query: any = { userId: user.userId };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    // Find tasks
    const tasks = await Task.find(query).sort({ createdAt: -1 });

    return createSuccessResponse({
      tasks,
      count: tasks.length,
    });
  } catch (error: any) {
    console.error('Get tasks error:', error);
    return createErrorResponse(
      error.message || 'An error occurred while fetching tasks',
      500
    );
  }
}

// POST /api/tasks - Create new task
export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticate(request);
    if (authResult instanceof Response) {
      return authResult;
    }

    const { user } = authResult;

    const body = await request.json();

    // Validate input
    const validationResult = taskSchema.safeParse(body);
    if (!validationResult.success) {
      return createErrorResponse(
        validationResult.error.issues[0].message,
        400
      );
    }

    // Connect to database
    await connectDB();

    // Create task
    const task = await Task.create({
      ...validationResult.data,
      userId: user.userId,
    });

    return createSuccessResponse(
      {
        message: 'Task created successfully',
        task,
      },
      201
    );
  } catch (error: any) {
    console.error('Create task error:', error);
    return createErrorResponse(
      error.message || 'An error occurred while creating task',
      500
    );
  }
}
