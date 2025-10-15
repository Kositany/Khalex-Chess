# Khalex Chess Setup Script

Write-Host "🚀 Setting up Khalex Chess Development Environment..." -ForegroundColor Green

# Check if Node.js is installed
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js not found. Please install Node.js 16+ first." -ForegroundColor Red
    exit 1
}

# Create .env file if it doesn't exist
if (!(Test-Path ".env")) {
    Write-Host "📝 Creating .env file from template..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✅ Please update .env with your actual credentials" -ForegroundColor Green
}

# Install dependencies if node_modules doesn't exist
if (!(Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Create logs directory for server
if (!(Test-Path "logs")) {
    New-Item -ItemType Directory -Path "logs"
    Write-Host "📁 Created logs directory" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎉 Setup complete! Here's what to do next:" -ForegroundColor Green
Write-Host ""
Write-Host "1. Update .env file with your credentials:" -ForegroundColor Cyan
Write-Host "   - MongoDB URI" -ForegroundColor White
Write-Host "   - MPESA credentials" -ForegroundColor White
Write-Host "   - Email configuration" -ForegroundColor White
Write-Host ""
Write-Host "2. Start development servers:" -ForegroundColor Cyan
Write-Host "   npm run dev:full    # Both frontend + backend" -ForegroundColor White
Write-Host "   npm run dev         # Frontend only" -ForegroundColor White
Write-Host "   npm run dev:server  # Backend only" -ForegroundColor White
Write-Host ""
Write-Host "3. Access your application:" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "   Backend:  http://localhost:5000" -ForegroundColor White
Write-Host ""
Write-Host "📚 Check README.md for detailed documentation" -ForegroundColor Yellow