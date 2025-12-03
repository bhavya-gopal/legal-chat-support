# How to Fix Your .env File

## The Problem

Your `.env` file has the wrong format. It currently looks like:
```
your_openai_api_key_here = k-proj-...
```

## The Solution

Create a `.env` file in the `backend/` directory with the correct format:

1. **Go to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create/Edit the .env file** with this exact format (NO SPACES around the `=`):
   ```
   OPENAI_API_KEY=k-proj-73W4BZVMtGRHWkfLHmklDwGEjQuCyFY9xoaT2tn7Y0kCpg5hZ92QnvNt4gkw1uOGYPIwjG5ckTT3BlbkFJje0OVrl47YwirWPf0HXLtd5HI_sd19qhFCF7hFFrvPjGvNWsif34KnRImySrzp81Y-29gIF9cA
   PORT=3001
   ```

3. **Important:** 
   - Variable name must be `OPENAI_API_KEY` (not `your_openai_api_key_here`)
   - NO spaces before or after the `=` sign
   - File must be named `.env` (starts with a dot)
   - File must be in the `backend/` directory

4. **Restart your server** after creating/updating the .env file

## Quick Fix Command

Run this from the project root:
```bash
cd backend && echo "OPENAI_API_KEY=k-proj-73W4BZVMtGRHWkfLHmklDwGEjQuCyFY9xoaT2tn7Y0kCpg5hZ92QnvNt4gkw1uOGYPIwjG5ckTT3BlbkFJje0OVrl47YwirWPf0HXLtd5HI_sd19qhFCF7hFFrvPjGvNWsif34KnRImySrzp81Y-29gIF9cA" > .env && echo "PORT=3001" >> .env && cat .env
```

