create table if not exists games (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists game_puzzles (
  id uuid primary key default gen_random_uuid(),
  game_id uuid not null references games(id) on delete cascade,
  puzzle_date date not null,
  difficulty text not null default 'medium',
  checkpoints jsonb not null default '{}'::jsonb,
  walls jsonb not null default '[]'::jsonb,
  solution_path int[] not null,
  unique (game_id, puzzle_date, difficulty)
);

create table if not exists game_progress (
  id uuid primary key default gen_random_uuid(),
  game_id uuid not null references games(id) on delete cascade,
  player_id uuid not null,
  puzzle_id uuid not null references game_puzzles(id) on delete cascade,
  path int[] not null default '{}',
  started_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (game_id, player_id, puzzle_id)
);

create table if not exists game_scores (
  id uuid primary key default gen_random_uuid(),
  game_id uuid not null references games(id) on delete cascade,
  puzzle_id uuid not null references game_puzzles(id) on delete cascade,
  player_id uuid not null,
  player_name varchar(50) not null,
  score int not null,
  completion_time_ms int not null,
  completed_at timestamptz not null default now(),
  unique (game_id, puzzle_id, player_id)
);

create index if not exists game_scores_global_rank_idx on game_scores (game_id, score desc, completion_time_ms asc);

alter table games enable row level security;
alter table game_puzzles enable row level security;
alter table game_progress enable row level security;
alter table game_scores enable row level security;

drop policy if exists "games are public" on games;
create policy "games are public" on games for select using (true);
drop policy if exists "puzzles are public" on game_puzzles;
create policy "puzzles are public" on game_puzzles for select using (true);
drop policy if exists "scores are public" on game_scores;
create policy "scores are public" on game_scores for select using (true);

insert into games (slug, name)
values ('rabbit-hole', 'Rabbit Hole')
on conflict (slug) do nothing;

insert into game_puzzles (game_id, puzzle_date, difficulty, checkpoints, solution_path)
select id, current_date, 'medium',
  '{"1":0,"2":12,"3":24,"4":36,"5":48}'::jsonb,
  array[0,1,2,3,4,5,6,13,12,11,10,9,8,7,14,15,16,17,18,19,20,27,26,25,24,23,22,21,28,29,30,31,32,33,34,41,40,39,38,37,36,35,42,43,44,45,46,47,48]
from games where slug = 'rabbit-hole'
on conflict (game_id, puzzle_date, difficulty) do nothing;

-- Scores/progress are intentionally write-protected from the browser.
-- Add server-side RPC/Edge Function policies after cookie identity validation.
