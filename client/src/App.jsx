import AppRoutes from "./routes/AppRoutes";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./store/AuthProvider";
import { Suspense } from "react";
import LazySpinner from "./components/LazySpinner";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <Suspense fallback={<LazySpinner />}>
        <ToastContainer position="bottom-center" />
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </QueryClientProvider>
      </Suspense>
    </>
  );
}

export default App;
