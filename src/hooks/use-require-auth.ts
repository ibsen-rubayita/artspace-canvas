import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";

/**
 * Wraps a child action so it only runs when the user is signed in.
 * Otherwise opens the AuthModal and shows a toast.
 */
export function useRequireAuth() {
  const { user, openAuth } = useAuth();
  return function requireAuth(action: () => void, label = "do this") {
    if (!user) {
      toast.error(`Please sign in to ${label}.`);
      openAuth("signin");
      return;
    }
    action();
  };
}
