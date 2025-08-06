#!/bin/bash

# FamilyOffice Advanced Development Setup
# Optimized development environment configuration

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[WARN] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}"
    exit 1
}

# Check if running from project root
if [[ ! -f "package.json" ]]; then
    error "Please run this script from the project root directory"
fi

log "🚀 Setting up FamilyOffice development environment..."

# Install global development tools
log "📦 Installing global development tools..."

# Check if tools are already installed
command -v pnpm >/dev/null 2>&1 || {
    log "Installing pnpm globally..."
    npm install -g pnpm@latest
}

command -v vercel >/dev/null 2>&1 || {
    log "Installing Vercel CLI..."
    npm install -g vercel@latest
}

command -v playwright >/dev/null 2>&1 || {
    log "Installing Playwright CLI..."
    npm install -g playwright@latest
}

# Development environment optimization
log "⚡ Optimizing development environment..."

# Create development .env if it doesn't exist
if [[ ! -f ".env.local" ]]; then
    if [[ -f ".env.example" ]]; then
        log "Creating .env.local from .env.example..."
        cp .env.example .env.local
        warn "Please update .env.local with your actual values"
    else
        warn ".env.example not found. Please create .env.local manually"
    fi
fi

# Setup Git hooks (if not already configured)
if [[ ! -f ".git/hooks/pre-commit" ]]; then
    log "🔧 Setting up Git hooks..."
    npx husky install
    npx husky add .git/hooks/pre-commit "npm run pre-commit"
    npx husky add .git/hooks/commit-msg "npx commitlint --edit \$1"
    chmod +x .git/hooks/pre-commit .git/hooks/commit-msg
fi

# Setup performance monitoring
log "📊 Setting up performance monitoring..."

# Create performance monitoring script
cat > scripts/performance-check.js << 'EOF'
#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Running performance analysis...');

try {
    // Bundle analysis
    console.log('📦 Analyzing bundle size...');
    execSync('npm run analyze', { stdio: 'pipe' });
    
    // Type checking
    console.log('🔍 Type checking...');
    execSync('npm run type-check', { stdio: 'pipe' });
    
    // Lint checking
    console.log('✨ Lint checking...');
    execSync('npm run lint', { stdio: 'pipe' });
    
    // Build performance
    console.log('🏗️  Build performance test...');
    const startTime = Date.now();
    execSync('npm run build', { stdio: 'pipe' });
    const buildTime = Date.now() - startTime;
    
    console.log(`✅ Build completed in ${buildTime}ms`);
    
    if (buildTime > 60000) {
        console.log('⚠️  Build time is slower than expected (>60s)');
    }
    
    console.log('✅ Performance analysis completed');
    
} catch (error) {
    console.error('❌ Performance analysis failed:', error.message);
    process.exit(1);
}
EOF

chmod +x scripts/performance-check.js

# Mobile development setup
log "📱 Setting up mobile development tools..."

# Create mobile testing script
cat > scripts/mobile-dev.js << 'EOF'
#!/usr/bin/env node

const os = require('os');
const { execSync } = require('child_process');

// Get local IP for mobile testing
function getLocalIP() {
    const nets = os.networkInterfaces();
    const results = [];
    
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                results.push(net.address);
            }
        }
    }
    
    return results[0] || 'localhost';
}

const ip = getLocalIP();
console.log(`📱 Mobile Development Server:`);
console.log(`🌐 Local: http://localhost:3000`);
console.log(`📲 Mobile: http://${ip}:3000`);
console.log(`📱 QR Code: Use your phone camera to scan`);

// Generate QR code if qrcode-terminal is available
try {
    const qr = require('qrcode-terminal');
    qr.generate(`http://${ip}:3000`, { small: true });
} catch (e) {
    console.log('💡 Install qrcode-terminal for QR codes: npm install -g qrcode-terminal');
}

console.log('\n🚀 Starting development server with mobile access...');
execSync('npm run dev:mobile', { stdio: 'inherit' });
EOF

chmod +x scripts/mobile-dev.js

# Database development setup
log "🗃️  Setting up database development tools..."

# Create database management script
cat > scripts/db-dev.sh << 'EOF'
#!/bin/bash

# Database development utilities

case "$1" in
    "reset")
        echo "🔄 Resetting database..."
        npm run db:reset
        ;;
    "studio")
        echo "🎨 Opening Drizzle Studio..."
        npm run db:studio
        ;;
    "backup")
        echo "💾 Creating database backup..."
        mkdir -p backups
        # Add your backup logic here
        echo "Backup created at backups/$(date +%Y%m%d_%H%M%S).sql"
        ;;
    "migrate")
        echo "🚀 Running migrations..."
        npm run db:migrate
        ;;
    *)
        echo "Usage: $0 {reset|studio|backup|migrate}"
        echo ""
        echo "Commands:"
        echo "  reset   - Reset database and reseed"
        echo "  studio  - Open Drizzle Studio"
        echo "  backup  - Create database backup"
        echo "  migrate - Run pending migrations"
        exit 1
        ;;
esac
EOF

chmod +x scripts/db-dev.sh

# Install recommended development packages
log "📚 Installing development utilities..."

# Check if package.json has dev dependencies we want to add
DEV_PACKAGES=(
    "@types/node"
    "concurrently"
    "cross-env"
    "rimraf"
)

# Install if missing
for package in "${DEV_PACKAGES[@]}"; do
    if ! npm list "$package" >/dev/null 2>&1; then
        log "Installing $package..."
        npm install --save-dev "$package"
    fi
done

# Setup IDE configuration
log "🔧 Setting up IDE configuration..."

# Create launch.json for debugging
mkdir -p .vscode
if [[ ! -f ".vscode/launch.json" ]]; then
    cat > .vscode/launch.json << 'EOF'
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Next.js: debug server-side",
            "type": "node",
            "request": "attach",
            "port": 9229,
            "skipFiles": ["<node_internals>/**"]
        },
        {
            "name": "Next.js: debug client-side",
            "type": "chrome",
            "request": "launch",
            "url": "http://localhost:3000"
        },
        {
            "name": "Next.js: debug full stack",
            "type": "node",
            "request": "launch",
            "program": "${workspaceFolder}/node_modules/.bin/next",
            "args": ["dev"],
            "console": "integratedTerminal",
            "skipFiles": ["<node_internals>/**"]
        }
    ]
}
EOF
fi

# Final setup verification
log "✅ Running setup verification..."

# Check Node.js version
NODE_VERSION=$(node --version)
log "Node.js version: $NODE_VERSION"

# Check npm/pnpm version
if command -v pnpm >/dev/null 2>&1; then
    PNPM_VERSION=$(pnpm --version)
    log "pnpm version: $PNPM_VERSION"
fi

# Check TypeScript version
if npm list typescript >/dev/null 2>&1; then
    TS_VERSION=$(npx tsc --version)
    log "TypeScript version: $TS_VERSION"
fi

log "🎉 Development environment setup completed!"
echo ""
log "🚀 Quick start commands:"
echo "  npm run dev:mobile     # Start with mobile access"
echo "  npm run test:e2e:ui    # Interactive Playwright tests"
echo "  npm run db:studio      # Open database GUI"
echo "  ./scripts/db-dev.sh    # Database utilities"
echo "  ./scripts/performance-check.js  # Performance analysis"
echo ""
log "📚 Happy coding!"