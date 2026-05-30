import { useEffect, useState } from "react";
import { X, Eye, EyeOff, Sparkles, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Mode = "signin" | "signup";

function generateStrongPassword(len = 16) {
  const lowers = "abcdefghjkmnpqrstuvwxyz";
  const uppers = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const nums = "23456789";
  const syms = "!@#$%^&*?-_+=";
  const all = lowers + uppers + nums + syms;
  const pick = (s: string) => s[Math.floor(Math.random() * s.length)];
  let pw = pick(lowers) + pick(uppers) + pick(nums) + pick(syms);
  for (let i = pw.length; i < len; i++) pw += pick(all);
  return pw.split("").sort(() => Math.random() - 0.5).join("");
}

function scorePassword(pw: string): { score: number; label: string; color: string } {
  let s = 0;
  if (pw.length >= 8) s++;
  if (pw.length >= 12) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  const map = [
    { label: "Very weak", color: "#f85149" },
    { label: "Weak", color: "#f85149" },
    { label: "Fair", color: "#d29922" },
    { label: "Good", color: "#58a6ff" },
    { label: "Strong", color: "#2ea043" },
    { label: "Excellent", color: "#2ea043" },
  ];
  return { score: s, ...map[s] };
}

export function AuthModal() {
  const { authState, closeAuth, openAuth } = useAuth();
  const [mode, setMode] = useState<Mode>("signin");
  const [busy, setBusy] = useState(false);

  // shared
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  // signup-only
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password2, setPassword2] = useState("");
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    if (authState.open) {
      setMode(authState.mode);
      setBusy(false);
    }
  }, [authState.open, authState.mode]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeAuth();
    if (authState.open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [authState.open, closeAuth]);

  if (!authState.open) return null;

  const strength = scorePassword(password);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Welcome back!");
    closeAuth();
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== password2) return toast.error("Passwords do not match");
    if (!agree) return toast.error("Please agree to the Terms");
    if (strength.score < 3) return toast.error("Please choose a stronger password");
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: { first_name: firstName, last_name: lastName },
      },
    });
    if (!error) {
      // Log notification submission (delivered to admin inbox via backend)
      await supabase.from("submissions").insert({
        kind: "signup_notification",
        name: `${firstName} ${lastName}`.trim(),
        email,
        subject: "New ArtSpace signup",
        message: `${firstName} ${lastName} just signed up.`,
      });
    }
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Account created — you're signed in.");
    closeAuth();
  };

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeAuth} />
      <div
        className="relative w-full max-w-md card-surface p-6 sm:p-7 shadow-2xl"
        style={{ borderRadius: 14 }}
      >
        <button
          onClick={closeAuth}
          aria-label="Close"
          className="absolute right-3 top-3 h-8 w-8 grid place-items-center rounded-lg hover:bg-[var(--color-surface-2)]"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="h-4 w-4 text-[var(--color-accent)]" />
          <span className="text-xs uppercase tracking-widest text-[var(--color-muted-foreground)]">
            ArtSpace
          </span>
        </div>
        <h2 className="text-xl font-semibold">
          {mode === "signin" ? "Welcome back" : "Create your account"}
        </h2>
        <p className="text-sm text-[var(--color-muted-foreground)] mt-1">
          {mode === "signin"
            ? "Sign in to post work, apply for jobs, and follow artists."
            : "Join the community of art lovers and creators."}
        </p>

        {mode === "signin" ? (
          <form onSubmit={handleSignIn} className="mt-5 space-y-4">
            <Field label="Email">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputCls}
                autoComplete="email"
              />
            </Field>
            <Field label="Password">
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn(inputCls, "pr-10")}
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPw((v) => !v)} className={eyeCls}>
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </Field>
            <button disabled={busy} className="btn btn-cta w-full">
              {busy ? "Signing in..." : "Sign in"}
            </button>
            <p className="text-sm text-center text-[var(--color-muted-foreground)]">
              Don't have an account?{" "}
              <button type="button" onClick={() => openAuth("signup")} className="text-[var(--color-accent)] hover:underline">
                Sign up
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleSignUp} className="mt-5 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Field label="First name">
                <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputCls} autoComplete="given-name" />
              </Field>
              <Field label="Last name">
                <input required value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputCls} autoComplete="family-name" />
              </Field>
            </div>
            <Field label="Email">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} autoComplete="email" />
            </Field>

            <Field label="Password">
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn(inputCls, "pr-24")}
                  autoComplete="new-password"
                  minLength={8}
                />
                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      const s = generateStrongPassword();
                      setPassword(s); setPassword2(s); setShowPw(true);
                    }}
                    className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-md hover:bg-[var(--color-surface-2)] text-[var(--color-accent)]"
                  >
                    Suggest
                  </button>
                  <button type="button" onClick={() => setShowPw((v) => !v)} className="h-7 w-7 grid place-items-center rounded-md hover:bg-[var(--color-surface-2)]">
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              {password && (
                <div className="mt-2">
                  <div className="h-1.5 w-full rounded-full bg-[var(--color-surface-2)] overflow-hidden">
                    <div
                      className="h-full transition-all duration-300"
                      style={{ width: `${(strength.score / 5) * 100}%`, background: strength.color }}
                    />
                  </div>
                  <p className="text-[11px] mt-1" style={{ color: strength.color }}>
                    Strength: {strength.label}
                  </p>
                </div>
              )}
            </Field>

            <Field label="Confirm password">
              <input
                type={showPw ? "text" : "password"}
                required
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className={inputCls}
                autoComplete="new-password"
              />
              {password2 && password === password2 && (
                <p className="text-[11px] mt-1 inline-flex items-center gap-1 text-[var(--color-cta-hover)]">
                  <Check className="h-3 w-3" /> Passwords match
                </p>
              )}
            </Field>

            <label className="flex items-start gap-2 text-sm select-none">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-[var(--color-accent)]"
              />
              <span className="text-[var(--color-muted-foreground)]">
                I agree to the{" "}
                <a href="#" className="text-[var(--color-accent)] hover:underline">Terms & Conditions</a>{" "}
                and Privacy Policy.
              </span>
            </label>

            <button disabled={busy} className="btn btn-cta w-full">
              {busy ? "Creating account..." : "Sign up"}
            </button>
            <p className="text-sm text-center text-[var(--color-muted-foreground)]">
              Already have an account?{" "}
              <button type="button" onClick={() => openAuth("signin")} className="text-[var(--color-accent)] hover:underline">
                Sign in
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

const inputCls =
  "w-full h-10 px-3 rounded-lg border bg-[var(--color-surface)] text-sm outline-none focus:border-[var(--color-accent)] transition-colors";
const eyeCls =
  "absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 grid place-items-center rounded-md hover:bg-[var(--color-surface-2)]";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-wider text-[var(--color-muted-foreground)] mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}
