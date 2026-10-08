# Supabase setup

Run `schema.sql` once in the Supabase SQL Editor. The browser anon key can read games, puzzles, and rankings; writes stay protected until a server-side score endpoint validates the guest identity and solution path.

The current UI keeps a local fallback, so the game remains usable while the migration is pending.
