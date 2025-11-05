#!/bin/bash

echo "🧹 Clearing all caches..."
rm -rf node_modules/.vite
rm -rf .vite
rm -rf dist

echo "✅ Cache cleared!"
echo ""
echo "🚀 Starting development server..."
echo ""
npm run dev

