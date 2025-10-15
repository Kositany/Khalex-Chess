# Newsletter Admin Setup Guide

## Quick Setup

1. **Environment Variables**: Create `.env` file with these values:
   ```bash
   # Copy .env.example to .env and update these values:
   VITE_API_URL=http://localhost:5000/api
   ADMIN_API_KEY=YourSecureAdminKey123!
   EMAIL_USER=khaltonyx@gmail.com
   EMAIL_PASS=your_gmail_app_password
   MONGODB_URI=mongodb://127.0.0.1:27017/khalex-chess
   APP_BASE_URL=http://localhost:3000
   ```

2. **Install Dependencies**:
   ```bash
   # Frontend
   npm install
   
   # Backend (if not already installed)
   cd server
   npm install mongoose
   cd ..
   ```

3. **Start Services**:
   ```bash
   # Terminal 1: Frontend
   npm run dev
   
   # Terminal 2: Backend server
   cd server
   npm start
   ```

## Using the Admin Panel

1. **Access Admin**: Visit `http://localhost:3000/admin/newsletter`

2. **Login**: Enter your admin key (from ADMIN_API_KEY env variable)

3. **Admin Features**:
   - View subscriber statistics
   - Compose newsletters with HTML content
   - Preview newsletters before sending
   - Send test emails to admin email
   - Send newsletters to all active subscribers
   - Batch sending with progress tracking

## Admin Panel Features

### Subscriber Stats
- Total subscribers count
- Active subscribers count  
- Last newsletter send info

### Newsletter Composer
- **Subject Line**: Engaging newsletter subject
- **HTML Content**: Rich content with formatting, links, images
- **Plain Text**: Fallback for text-only clients
- **Live Preview**: See how emails will look to subscribers

### Sending Options
- **Test Email**: Send preview to admin email first
- **Bulk Send**: Send to all active subscribers
- **Batched Delivery**: Sends in batches of 50 to be SMTP-friendly
- **Unsubscribe Links**: Automatically added to all newsletters

### Security
- Admin key authentication
- Protected API endpoints
- Session persistence across browser sessions

## API Endpoints

### Newsletter Management
- `GET /api/newsletter/stats` - Get subscriber statistics (admin only)
- `POST /api/newsletter/send` - Send newsletter to all active subscribers (admin only)
- `POST /api/newsletter/test` - Send test email to admin (admin only)
- `POST /api/newsletter` - Subscribe to newsletter (public)
- `GET /api/newsletter/unsubscribe/:token` - Unsubscribe (public)

### Usage Examples

**Get Stats**:
```bash
curl -H "x-admin-key: YourSecureAdminKey123!" http://localhost:5000/api/newsletter/stats
```

**Send Newsletter**:
```bash
curl -X POST http://localhost:5000/api/newsletter/send \
  -H "Content-Type: application/json" \
  -H "x-admin-key: YourSecureAdminKey123!" \
  -d '{
    "subject": "Holiday Chess Camp 2025",
    "html": "<h2>Join our Chess Camp!</h2><p>Registration now open...</p>"
  }'
```

## Database Schema

### Subscribers Collection
```javascript
{
  email: String (required, unique),
  name: String,
  verified: Boolean (default: true),
  unsubscribed: Boolean (default: false),
  unsubscribeToken: String (auto-generated),
  createdAt: Date,
  updatedAt: Date
}
```

## Email Templates

All newsletters include:
- Khalex Chess branded header
- Custom content (your HTML)
- Automatic unsubscribe footer
- Responsive design
- Plain text fallback

## Troubleshooting

### Admin Can't Login
- Check ADMIN_API_KEY in .env matches login key
- Ensure backend server is running
- Check browser console for API errors

### Emails Not Sending  
- Verify EMAIL_USER and EMAIL_PASS in .env
- Use Gmail App Password (not regular password)
- Check server logs for SMTP errors

### No Subscribers Showing
- Ensure MongoDB is running
- Check database connection
- Verify subscribers collection exists

## Production Deployment

1. Update environment variables for production
2. Use secure admin keys
3. Configure production SMTP settings
4. Set up proper SSL certificates
5. Consider rate limiting for API endpoints