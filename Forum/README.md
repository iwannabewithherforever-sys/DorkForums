# Dorkbin

A pastebin-style forum built with static HTML/JS and Netlify Functions for backend.

## Features
- User registration and login
- View and manage personal pastes
- Search pastes
- Dynamic stats

## Setup
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Run `netlify dev` to test locally
3. Deploy: `netlify deploy` or connect to GitHub

## Backend
Functions in `netlify/functions/` handle API calls. Currently simulated; integrate with a DB like Supabase for production.