import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/shop")({
  component: () => <Navigate to="/tools" replace />,
});
