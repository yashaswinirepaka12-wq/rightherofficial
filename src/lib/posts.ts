import { supabase } from "@/integrations/supabase/client";

export interface Post {
  id: string;
  title: string;
  summary: string | null;
  content: string;
  featured_image: string | null;
  slug: string;
  publication_date: string;
  created_at: string;
  updated_at: string;
}

export async function fetchLatestPosts(limit = 6): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("publication_date", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as Post[];
}

export async function fetchPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return (data as Post) ?? null;
}

export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min read`;
}
