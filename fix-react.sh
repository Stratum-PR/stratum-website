#!/bin/bash

echo "🔥 Nuclear option - complete reinstall..."
echo ""

# Kill any running node processes
pkill -f "vite" 2>/dev/null || true
pkill -f "node" 2>/dev/null || true

echo "1️⃣ Removing node_modules..."
rm -rf node_modules

echo "2️⃣ Removing package-lock.json..."
rm -f package-lock.json

echo "3️⃣ Removing all caches..."
rm -rf node_modules/.vite
rm -rf .vite
rm -rf dist

echo "4️⃣ Reinstalling dependencies..."
npm install

echo ""
echo "✅ Done! Now run: npm run dev"

