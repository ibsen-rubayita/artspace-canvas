import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { BookOpen, Share2, UserPlus, UserCheck, X, Heart, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { PageHero } from "@/components/site/PageHero";

import art1 from "@/assets/art-1.jpg";
import art2 from "@/assets/art-2.jpg";
import art4 from "@/assets/art-4.jpg";
import art5 from "@/assets/art-5.jpg";
import art6 from "@/assets/art-6.jpg";
import art8 from "@/assets/art-8.jpg";
import gFigure from "@/assets/gallery-figure.jpg";
import gCollage from "@/assets/gallery-collage.jpg";
import gBronze from "@/assets/gallery-bronze.jpg";
import gDoorway from "@/assets/gallery-doorway.jpg";
import magazine from "@/assets/explore-magazine.jpg";

export const Route = createFileRoute("/blogs")({
  head: () => ({
    meta: [
      { title: "Blogs & Magazine — ArtSpace" },
      { name: "description", content: "Read blogs from artists about their works, studio process and field notes — plus ArtSpace Magazine features." },
      { property: "og:title", content: "Blogs & Magazine — ArtSpace" },
      { property: "og:description", content: "Stories from artists about their works, process and studios." },
    ],
  }),
  component: BlogsPage,
});

type Post = {
  id: string;
  img: string;
  title: string;
  excerpt: string;
  body: string;
  artist: string;
  artistHandle: string;
  readTime: string;
  tag: "Blog" | "Essay" | "Photo" | "Feature" | "Interview" | "Process" | "Cover";
};

const POSTS: Post[] = [
  {
    id: "1",
    img: art2,
    title: "Concept Art in 2026",
    excerpt: "How small studios are reshaping early visual development.",
    body: "I spent the last six months sketching morning thumbnails — small, fast, no precious lines. The work in this post came out of that practice: a pile of half-finished worlds, edited down to a handful that felt honest. Concept art in 2026 is less about polish and more about getting to a feeling fast, then defending it.",
    artist: "Studio North",
    artistHandle: "@studionorth",
    readTime: "7 min read",
    tag: "Blog",
  },
  {
    id: "2",
    img: art5,
    title: "Sculpting Pipelines, Demystified",
    excerpt: "A working studio's actual ZBrush → bake → paint loop.",
    body: "We get asked about our pipeline almost every week. The truth: it's three folders and one rule. Block, refine, bake. Everything else is taste. Here are the files, in order, with notes on what we throw away and why.",
    artist: "Atelier Mech",
    artistHandle: "@ateliermech",
    readTime: "12 min read",
    tag: "Process",
  },
  {
    id: "3",
    img: art6,
    title: "Watercolor Field Notes",
    excerpt: "On painting outdoors in unfamiliar weather.",
    body: "I went north for a week with one small box of pigments. The paper buckled, the light moved, and I learned to stop fighting both. These are pages from the sketchbook, in the order I painted them, with the mistakes left in.",
    artist: "J. Pereira",
    artistHandle: "@jpereira",
    readTime: "4 min read",
    tag: "Blog",
  },
  {
    id: "4",
    img: gCollage,
    title: "Why Collage Is Back",
    excerpt: "On scissors, glue and the slow internet.",
    body: "Collage rewards looking. You cannot scroll a glued page. The artists in this essay are not chasing a trend — they're answering a quieter question about attention, and about what hands can do that software still can't.",
    artist: "K. Aoki",
    artistHandle: "@kaoki",
    readTime: "6 min read",
    tag: "Essay",
  },
  {
    id: "5",
    img: gDoorway,
    title: "On Returning to Film",
    excerpt: "Lisbon, a borrowed Leica, and the cost of slowing down.",
    body: "I shot one roll a day for thirty days. Some of the frames are in this post; most are not. Returning to film didn't make me a better photographer — it made me a more patient one, and that turned out to be the same thing.",
    artist: "M. Costa",
    artistHandle: "@mcosta",
    readTime: "9 min read",
    tag: "Photo",
  },
  {
    id: "6",
    img: art4,
    title: "Cities After Midnight",
    excerpt: "A long walk through quiet streets, camera in hand.",
    body: "Between 1am and 4am, cities become rooms. The light is honest, the people few, and the geometry shows up. This is a small set from a year of late walks — Tokyo, Seoul, and a single night in Porto.",
    artist: "N. Hayashi",
    artistHandle: "@nhayashi",
    readTime: "5 min read",
    tag: "Photo",
  },
  {
    id: "7",
    img: magazine,
    title: "Issue 14 — The Quiet Studios",
    excerpt: "Inside the studios that don't post much.",
    body: "Issue 14 is about the artists who work mostly offline. We visited eight studios across four countries, photographed the rooms as we found them, and asked one question: what does your day actually look like? The answers are in this issue.",
    artist: "ArtSpace Magazine",
    artistHandle: "@artspacemag",
    readTime: "Spring 2026",
    tag: "Cover",
  },
  {
    id: "8",
    img: art8,
    title: "Portraits at the Edge",
    excerpt: "A feature on contemporary portraiture in shifting light.",
    body: "Six painters, one prompt: the edge of a face. The work that came back surprised us — almost none of it was about likeness. This long read collects the paintings, the studio notes, and the conversations that followed.",
    artist: "A. Petrov",
    artistHandle: "@apetrov",
    readTime: "Long read",
    tag: "Feature",
  },
  {
    id: "9",
    img: art1,
    title: "Color Is a Political Act",
    excerpt: "An interview about pigment, history and choice.",
    body: "We sat down with S. Vance in her Atlantic studio to talk about blue. The conversation went, as these things do, somewhere else: into history, supply chains, and the small daily decisions that make a body of work.",
    artist: "S. Vance",
    artistHandle: "@svance",
    readTime: "Interview",
    tag: "Interview",
  },
  {
    id: "10",
    img: gBronze,
    title: "Cast & Counterweight",
    excerpt: "A studio visit with a bronze sculptor.",
    body: "R. Okafor works in a converted garage with two assistants and a kiln older than any of them. We spent a day photographing the casting process, and another day just listening. Both days are in this piece.",
    artist: "R. Okafor",
    artistHandle: "@rokafor",
    readTime: "Studio visit",
    tag: "Feature",
  },
  {
    id: "11",
    img: gFigure,
    title: "Figure, Slowly",
    excerpt: "Notes on a year spent painting the same model.",
    body: "One model, one room, one afternoon a week, for a year. The paintings got worse before they got better, and then they got strange. This post is a selection — twelve canvases out of forty-eight — with what I remember thinking at the time.",
    artist: "L. Marin",
    artistHandle: "@lmarin",
    readTime: "8 min read",
    tag: "Blog",
  },
];

function TagPill({ tag }: { tag: Post["tag"] }) {
  return (
    <span
      className="badge"
      style={{
        background: "color-mix(in oklab, var(--color-accent) 18%, transparent)",
        color: "var(--color-accent)",
      }}
    >
      {tag}
    </span>
  );
}

function PostCard({ post, onOpen }: { post: Post; onOpen: () => void }) {
  return (
    <button onClick={onOpen} className="card-surface text-left overflow-hidden group flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={post.img}
          alt={post.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3"><TagPill tag={post.tag} /></div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold leading-snug">{post.title}</h3>
        <p className="mt-1.5 text-sm text-[var(--color-muted-foreground)] line-clamp-2">{post.excerpt}</p>
        <div className="mt-3 flex items-center justify-between text-xs text-[var(--color-muted-foreground)]">
          <span>By {post.artist}</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </button>
  );
}

type Comment = { id: string; user_id: string; body: string; created_at: string };

function PostDialog({ post, onClose }: { post: Post; onClose: () => void }) {
  const { user, openAuth } = useAuth();
  const [following, setFollowing] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [draft, setDraft] = useState("");
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    if (!user) { setLikeCount(0); setComments([]); setLiked(false); return; }
    let cancel = false;
    (async () => {
      const [{ count }, { data: cm }, likedRes] = await Promise.all([
        supabase.from("blog_likes").select("*", { count: "exact", head: true }).eq("post_id", post.id),
        supabase.from("blog_comments").select("id,user_id,body,created_at").eq("post_id", post.id).order("created_at", { ascending: false }),
        supabase.from("blog_likes").select("post_id").eq("post_id", post.id).eq("user_id", user.id).maybeSingle(),
      ]);
      if (cancel) return;
      setLikeCount(count ?? 0);
      setComments((cm as Comment[]) ?? []);
      setLiked(!!(likedRes as any)?.data);
    })();
    return () => { cancel = true; };
  }, [post.id, user?.id]);

  const onShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (typeof navigator !== "undefined" && (navigator as any).share) {
        await (navigator as any).share({ title: post.title, text: post.excerpt, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard");
      }
    } catch { /* dismissed */ }
  };

  const onFollow = () => {
    setFollowing((v) => !v);
    toast.success(following ? `Unfollowed ${post.artist}` : `Following ${post.artist}`);
  };

  const onLike = async () => {
    if (!user) { openAuth("signin"); return; }
    const next = !liked;
    setLiked(next);
    setLikeCount((c) => c + (next ? 1 : -1));
    const { error } = next
      ? await supabase.from("blog_likes").insert({ post_id: post.id, user_id: user.id })
      : await supabase.from("blog_likes").delete().eq("post_id", post.id).eq("user_id", user.id);
    if (error) {
      setLiked(!next);
      setLikeCount((c) => c + (next ? -1 : 1));
      toast.error(error.message);
    }
  };

  const onComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { openAuth("signin"); return; }
    const body = draft.trim();
    if (!body) return;
    setPosting(true);
    const { data, error } = await supabase
      .from("blog_comments")
      .insert({ post_id: post.id, user_id: user.id, body })
      .select("id,user_id,body,created_at")
      .single();
    setPosting(false);
    if (error) { toast.error(error.message); return; }
    setComments((cs) => [data as Comment, ...cs]);
    setDraft("");
  };

  const onDeleteComment = async (id: string) => {
    const prev = comments;
    setComments((cs) => cs.filter((c) => c.id !== id));
    const { error } = await supabase.from("blog_comments").delete().eq("id", id);
    if (error) { setComments(prev); toast.error(error.message); }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-stretch sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/70 animate-fade-in" onClick={onClose} />
      <div
        className="relative z-10 w-full sm:max-w-2xl sm:rounded-xl border overflow-hidden animate-fade-up flex flex-col max-h-full sm:max-h-[90vh]"
        style={{ borderColor: "var(--color-border)", background: "var(--color-background)" }}
      >
        <div className="relative">
          <img src={post.img} alt={post.title} className="w-full aspect-[16/9] object-cover" />
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-lg bg-black/50 text-white hover:bg-black/70"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute top-3 left-3"><TagPill tag={post.tag} /></div>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto">
          <h2 className="text-xl sm:text-2xl font-semibold leading-tight">{post.title}</h2>
          <div className="mt-2 flex items-center gap-3 text-sm text-[var(--color-muted-foreground)]">
            <span className="font-medium text-[var(--color-foreground)]">{post.artist}</span>
            <span>·</span>
            <span>{post.artistHandle}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>

          <p className="mt-4 text-[15px] leading-relaxed">{post.body}</p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <button
              onClick={() => { if (!user) { openAuth("signin"); return; } onFollow(); }}
              className={following ? "btn btn-ghost inline-flex items-center gap-2" : "btn btn-cta inline-flex items-center gap-2"}
            >
              {following ? <><UserCheck className="h-4 w-4" /> Following</> : <><UserPlus className="h-4 w-4" /> Follow {post.artist}</>}
            </button>
            <button onClick={onShare} className="btn btn-ghost inline-flex items-center gap-2">
              <Share2 className="h-4 w-4" /> Share
            </button>
            {user && (
              <>
                <button onClick={onLike} className="btn btn-ghost inline-flex items-center gap-2" aria-pressed={liked}>
                  <Heart className={liked ? "h-4 w-4 fill-current text-[var(--color-accent)]" : "h-4 w-4"} />
                  {likeCount}
                </button>
                <span className="btn btn-ghost inline-flex items-center gap-2 pointer-events-none">
                  <MessageCircle className="h-4 w-4" /> {comments.length}
                </span>
              </>
            )}
          </div>

          <div className="mt-6 pt-5 border-t" style={{ borderColor: "var(--color-border)" }}>
            <h3 className="text-sm font-semibold mb-3">Comments</h3>
            {!user ? (
              <div className="rounded-lg border p-5 text-center" style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}>
                <p className="text-sm text-[var(--color-muted-foreground)] mb-3">
                  Sign in to like this post and read or write comments.
                </p>
                <button onClick={() => openAuth("signin")} className="btn btn-cta px-4 py-1.5 text-sm">
                  Sign in
                </button>
              </div>
            ) : (
              <>
                <form onSubmit={onComment} className="flex flex-col gap-2 mb-4">
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="Share your thoughts…"
                    disabled={posting}
                    rows={2}
                    maxLength={2000}
                    className="w-full rounded-lg border px-3 py-2 text-sm bg-[var(--color-surface)] resize-none focus:outline-none focus:border-[var(--color-accent)]"
                    style={{ borderColor: "var(--color-border)" }}
                  />
                  <div className="flex justify-end">
                    <button type="submit" disabled={!draft.trim() || posting} className="btn btn-cta px-4 py-1.5 text-sm">
                      {posting ? "Posting…" : "Post comment"}
                    </button>
                  </div>
                </form>

                {comments.length === 0 ? (
                  <p className="text-sm text-[var(--color-muted-foreground)]">No comments yet — be the first.</p>
                ) : (
                  <ul className="flex flex-col gap-3">
                    {comments.map((c) => (
                      <li key={c.id} className="rounded-lg border p-3" style={{ borderColor: "var(--color-border)" }}>
                        <div className="flex items-center justify-between text-xs text-[var(--color-muted-foreground)] mb-1">
                          <span className="font-mono">{c.user_id.slice(0, 8)}</span>
                          <span>{new Date(c.created_at).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap">{c.body}</p>
                        {user.id === c.user_id && (
                          <button onClick={() => onDeleteComment(c.id)} className="mt-2 text-xs text-[var(--color-muted-foreground)] hover:text-[var(--color-accent)]">
                            Delete
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function BlogsPage() {
  const [active, setActive] = useState<Post | null>(null);
  const [filter, setFilter] = useState<"All" | Post["tag"]>("All");

  const tags: ("All" | Post["tag"])[] = ["All", "Blog", "Essay", "Process", "Photo", "Feature", "Interview", "Cover"];
  const list = filter === "All" ? POSTS : POSTS.filter((p) => p.tag === filter);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Header />

      <PageHero
        eyebrow="Blogs & Magazine"
        icon={BookOpen}
        title={<>Stories from artists about <span className="text-[var(--color-accent)]">their work</span>.</>}
        description="Long-form notes, studio visits and magazine features — written by the artists making the work, and the editors who follow them."
      />

      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-4">
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className="px-3 py-1.5 rounded-full text-sm border transition-colors"
              style={{
                borderColor: "var(--color-border)",
                background: filter === t ? "var(--color-accent)" : "var(--color-surface)",
                color: filter === t ? "#fff" : "var(--color-foreground)",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 lg:px-6 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((p) => (
            <PostCard key={p.id} post={p} onOpen={() => setActive(p)} />
          ))}
        </div>
      </section>

      {active && <PostDialog post={active} onClose={() => setActive(null)} />}

      <Footer />
      <ScrollToTop />
    </div>
  );
}
