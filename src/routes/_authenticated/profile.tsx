import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { toast } from "sonner";
import { Camera, Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/profile")({
  component: ProfilePage,
});

type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  username: string | null;
  bio: string | null;
  website: string | null;
  avatar_url: string | null;
};

function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [email, setEmail] = useState(user?.email ?? "");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await (supabase.from("profiles") as any)
        .select("id, first_name, last_name, username, bio, website, avatar_url")
        .eq("id", user.id)
        .maybeSingle();
      setProfile(
        (data as Profile | null) ?? {
          id: user.id,
          first_name: null,
          last_name: null,
          username: null,
          bio: null,
          website: null,
          avatar_url: null,
        }
      );
      setLoading(false);
    })();
  }, [user]);

  if (!user) return null;

  const update = (patch: Partial<Profile>) =>
    setProfile((p) => (p ? { ...p, ...patch } : p));

  const onSave = async () => {
    if (!profile) return;
    setSaving(true);
    const { error } = await (supabase.from("profiles") as any).upsert({
      id: user.id,
      first_name: profile.first_name,
      last_name: profile.last_name,
      username: profile.username,
      bio: profile.bio,
      website: profile.website,
      avatar_url: profile.avatar_url,
      updated_at: new Date().toISOString(),
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Profile saved");
    }
    if (email && email !== user.email) {
      const { error: emailErr } = await supabase.auth.updateUser({ email });
      if (emailErr) toast.error(emailErr.message);
      else toast.success("Check your inbox to confirm the new email");
    }
    setSaving(false);
  };

  const onUpload = async (file: File) => {
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${user.id}/${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from("avatars")
      .upload(path, file, { upsert: true, contentType: file.type });
    if (error) {
      toast.error(error.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("avatars").getPublicUrl(path);
    update({ avatar_url: data.publicUrl });
    await (supabase.from("profiles") as any).upsert({
      id: user.id,
      avatar_url: data.publicUrl,
      updated_at: new Date().toISOString(),
    });
    toast.success("Avatar updated");
    setUploading(false);
  };

  const initials = (
    profile?.first_name?.[0] ??
    user.email?.[0] ??
    "A"
  ).toUpperCase();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 mx-auto w-full max-w-2xl px-4 lg:px-6 py-10">
        <h1 className="text-2xl font-semibold tracking-tight mb-6">Your profile</h1>

        {loading || !profile ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-[var(--color-muted-foreground)]" />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center gap-5">
              <div
                className="relative h-24 w-24 rounded-full overflow-hidden grid place-items-center text-2xl font-medium text-white"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-accent), color-mix(in oklab, var(--color-accent) 50%, #000))",
                }}
              >
                {profile.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt="Avatar"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>{initials}</span>
                )}
              </div>
              <div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) onUpload(f);
                  }}
                />
                <button
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="btn btn-ghost inline-flex items-center gap-2"
                >
                  {uploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Camera className="h-4 w-4" />
                  )}
                  {uploading ? "Uploading..." : "Change photo"}
                </button>
                <p className="text-xs text-[var(--color-muted-foreground)] mt-1">
                  JPG, PNG or GIF. Max 5MB.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="First name"
                value={profile.first_name ?? ""}
                onChange={(v) => update({ first_name: v })}
              />
              <Field
                label="Last name"
                value={profile.last_name ?? ""}
                onChange={(v) => update({ last_name: v })}
              />
            </div>

            <Field
              label="Username"
              value={profile.username ?? ""}
              onChange={(v) => update({ username: v })}
              placeholder="your-handle"
            />

            <Field
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
            />

            <Field
              label="Website"
              value={profile.website ?? ""}
              onChange={(v) => update({ website: v })}
              placeholder="https://"
            />

            <div>
              <label className="block text-sm font-medium mb-1.5">Bio</label>
              <textarea
                value={profile.bio ?? ""}
                onChange={(e) => update({ bio: e.target.value })}
                rows={4}
                className="w-full rounded-lg border bg-[var(--color-surface)] px-3 py-2 text-sm outline-none focus:border-[var(--color-accent)] resize-none"
                style={{ borderColor: "var(--color-border)" }}
                placeholder="Tell us a bit about yourself…"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={onSave}
                disabled={saving}
                className="btn btn-cta inline-flex items-center gap-2"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                Save changes
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-10 rounded-lg border bg-[var(--color-surface)] px-3 text-sm outline-none focus:border-[var(--color-accent)]"
        style={{ borderColor: "var(--color-border)" }}
      />
    </div>
  );
}
