import "./index.css";
import {
  createRouter,
  createRoute,
  createRootRoute,
  RouterProvider,
  Outlet,
} from "@tanstack/react-router";
import { Home } from "./routes/Home";
import { CV } from "./routes/CV";
import { ZK } from "./routes/ZK";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const cvRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cv",
  component: CV,
});

const zkRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/zk",
  component: ZK,
});

const routeTree = rootRoute.addChildren([indexRoute, cvRoute, zkRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
