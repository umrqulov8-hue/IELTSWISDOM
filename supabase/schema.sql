-- SCHEMA SETUP FOR IELTS WISDOM
-- RUN THIS IN THE SUPABASE SQL EDITOR

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  avatar_url TEXT,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. LESSONS TABLE
CREATE TABLE IF NOT EXISTS public.lessons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  module TEXT NOT NULL,
  icon_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for lessons (everyone can read)
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read for lessons" ON public.lessons FOR SELECT USING (true);

-- 3. TEST RESULTS TABLE
CREATE TABLE IF NOT EXISTS public.test_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  test_id TEXT NOT NULL,
  score NUMERIC NOT NULL,
  total_questions INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for test_results (users read/write their own)
ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own results" ON public.test_results
  FOR ALL USING (auth.uid() = user_id);

-- 4. STUDENT STATS TABLE
CREATE TABLE IF NOT EXISTS public.student_stats (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  completed_lessons INTEGER DEFAULT 0,
  total_lessons INTEGER DEFAULT 100,
  current_streak INTEGER DEFAULT 0,
  last_activity TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for student_stats
ALTER TABLE public.student_stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own stats" ON public.student_stats
  FOR ALL USING (auth.uid() = user_id);

-- 5. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  type TEXT DEFAULT 'info',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own notifications" ON public.notifications
  FOR ALL USING (auth.uid() = user_id);

-- 6. AUTOMATIC PROFILE CREATION ON SIGNUP
-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    new.id, 
    COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', 'New Student'), 
    COALESCE(new.raw_user_meta_data->>'avatar_url', '')
  );
  
  INSERT INTO public.student_stats (user_id, total_lessons)
  VALUES (new.id, 100);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 7. POLICIES FOR PROFILES
CREATE POLICY "Public read for profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profiles" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 8. INITIAL SEED DATA FOR LESSONS
INSERT INTO public.lessons (title, slug, module, icon_name)
VALUES 
  ('Mastering IELTS Reading', 'ielts-reading-mastery', 'reading', 'BookOpen'),
  ('Listening Strategies for Success', 'listening-strategies', 'listening', 'Headphones'),
  ('Academic Writing Task 1 Guide', 'writing-task-1', 'writing', 'PenTool'),
  ('Speaking with Confidence', 'speaking-confidence', 'speaking', 'MessageSquare'),
  ('Essential Vocabulary for IELTS', 'essential-vocab', 'reading', 'CheckCircle')
ON CONFLICT (slug) DO NOTHING;
