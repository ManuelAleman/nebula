import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import MyFiles from "./pages/MyFiles";
import Subscription from "./pages/Subscription";
import Transactions from "./pages/Transactions";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { RedirectToSignIn } from "@clerk/clerk-react";
import { Toaster } from "react-hot-toast";
import { UserCreditsProvider } from "./context/UserCreditsContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import SubscriptionSuccess from "./components/subscription-success";
import PublicFileView from "./pages/PublicFileView";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHEABLE_KEY);
const App = () => {
  return (
    <UserCreditsProvider>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="subscription-success" element={<SubscriptionSuccess />} />
          <Route path="subscription-cancel" element={<p>Pago cancelado</p>} />
          <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
          <Route path="my-files" element={<ProtectedRoute><MyFiles /></ProtectedRoute>} />
          <Route path="subscriptions" element={<ProtectedRoute><Elements stripe={stripePromise}><Subscription /></Elements></ProtectedRoute>} />
          <Route path="transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
          <Route path="/file/:fileId" element={<PublicFileView />} />
          <Route path="/*" element={<RedirectToSignIn />} />
        </Routes>
      </BrowserRouter>
    </UserCreditsProvider>
  );
};

export default App;
