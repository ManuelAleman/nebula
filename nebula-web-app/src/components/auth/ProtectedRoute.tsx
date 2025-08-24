import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => (
  <>
    <SignedIn>{children}</SignedIn>
    <SignedOut><RedirectToSignIn /></SignedOut>
  </>
);

export default ProtectedRoute;