# FriendChat

A real-time chat application built with HTML, CSS, and Supabase.

## Features

- **Real-time messaging** - Instant message delivery using Supabase Realtime
- **Media sharing** - Upload and share images, videos, and documents
- **Message replies** - Reply to specific messages with context
- **Delete messages** - Users can delete their own messages (syncs to all users)
- **Emoji picker** - Built-in emoji selection
- **Text formatting** - Bold, italic, and underline support
- **PIN protection** - Secure lock screen with PIN code
- **Dark mode** - Automatic dark mode support
- **Mobile responsive** - Works on all devices

## Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Create a `messages` table with columns:
   - `id` (uuid, primary key)
   - `username` (text)
   - `content` (text)
   - `media_url` (text, nullable)
   - `media_type` (text, nullable)
   - `reply_to` (jsonb, nullable)
   - `created_at` (timestamp)
3. Create a `chat-media` storage bucket
4. Update RLS policies for storage and database access
5. Deploy to Netlify or any static host

## PIN Code

Default PIN: ``

## Tech Stack

- HTML5
- CSS3 (Glassmorphism design)
- Vanilla JavaScript
- Supabase (Database, Realtime, Storage)

## Live Demo

The app can be deployed to Netlify with zero configuration.
