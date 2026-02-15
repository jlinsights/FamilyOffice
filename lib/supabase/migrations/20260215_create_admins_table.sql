-- Create admins table for Role-Based Access Control (RBAC)
CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) NOT NULL UNIQUE,
    email TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin', -- 'super_admin', 'admin', 'editor', etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on admins table
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Policy: Only existing admins can view backend admin list (bootstrapping issue)
-- Initial bootstrap might require manual insertion or a specific policy for the first admin
-- For now, we allow users to view their own admin status
CREATE POLICY "Users can view their own admin status" ON admins
    FOR SELECT
    USING (auth.uid() = user_id);

-- Policy: Super admins can manage other admins (Logic to be implemented if hierarchy is needed)
-- For simplicity in this migration, we assume manual management via Supabase Dashboard for initial admins

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_admins_user_id ON admins(user_id);
