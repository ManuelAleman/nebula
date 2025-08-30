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

const App = () => {
  return (
    <BrowserRouter>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
        <Route path="my-files" element={<ProtectedRoute><MyFiles /></ProtectedRoute>} />
        <Route path="subscriptions" element={<ProtectedRoute><Subscription /></ProtectedRoute>} />
        <Route path="transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
        <Route path="/*" element={<RedirectToSignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
