#!/bin/bash

# Navigate to the project directory
cd /Users/jaehong/Developer/Projects/FamilyOffice

# Show current status
echo "📋 Checking git status..."
git status

# Add all changes
echo "📝 Adding changes..."
git add .

# Commit with a descriptive message
echo "💾 Committing changes..."
git commit -m "fix: Update Cal.com URLs to use coffeechat endpoint

- Updated SeminarRegistrationSection.tsx: consultation → coffeechat
- Updated contact page CTA button: consultation → coffeechat
- Unified all Cal.com booking links across the application

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# Push to remote
echo "🚀 Pushing to remote..."
git push

# Build the project
echo "🏗️ Building the project..."
npm run build

echo "✅ All done!"