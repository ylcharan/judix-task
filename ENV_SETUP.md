# Environment Variables Configuration

Copy this file to `.env.local` and fill in your actual values:

```bash
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/judix-task?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## MongoDB Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Get your connection string
5. Replace the placeholder values in `.env.local`

## JWT Secret

Generate a secure random string for your JWT secret. You can use:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
