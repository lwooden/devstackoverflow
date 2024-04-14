import { authMiddleware } from "@clerk/nextjs"

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  // public routes that don't require authentication
  publicRoutes: [
    "/",
    "/api/webhook",
    "question/:id",
    "/tags",
    "/tags/:id",
    "/profile/:id",
    "/community",
    "/jobs",
  ],
  // routes to ignore middleware processing
  ignoredRoutes: ["/api/webhook", "/api/chatgpt"],
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
