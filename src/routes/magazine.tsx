import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/magazine")({
  component: () => <Navigate to="/blogs" replace />,
});
