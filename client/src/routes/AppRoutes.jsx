import { RouterProvider, createBrowserRouter } from "react-router";
import { lazy } from "react";
import { useAuth } from "@/hooks/useAuth";
import { PrivateRoute, PublicRoute } from "./ProtectedRoute";
import LazySpinner from "@/components/LazySpinner";
import { Suspense } from "react";
import Profile from "@/pages /profile/Profile";
import Payment from "@/pages /payments/Payment";
import Revenue from "@/pages /revenue/Revenue";
import ErrorBoundary from "@/components/ErrorBoundary";

const AuthLayout = lazy(() => import("../layout/AuthLayout"));
const Dashboard = lazy(() => import("../pages /dashboard/Dashboard"));
const Users = lazy(() => import("../pages /users/Users"));
const AdminOrders = lazy(() =>
  import("../pages /dashboard/orders/AdminOrders")
);
const RootLayout = lazy(() => import("../layout/RootLayout"));
const ForgotLayout = lazy(() => import("../layout/ForgotLayout"));
const ProfileLayout = lazy(() => import("../layout/ProfileLayout"));
const AdminLayout = lazy(() => import("../layout/AdminLayout"));
const Login = lazy(() => import("../pages /auth/Login"));
const CreateAccount = lazy(() => import("../pages /auth/CreateAccount"));
const Home = lazy(() => import("../pages /home/Home"));
const PaymentOptions = lazy(() =>
  import("../pages /payment-options/PaymentOptions")
);
const ForgotPassword = lazy(() => import("../pages /auth/ForgotPassword"));
const Orders = lazy(() => import("../pages /orders/Orders"));
const ResetPassword = lazy(() => import("../pages /auth/ResetPassword"));
const VerifyEmail = lazy(() => import("../pages /verify-email/VerifyEmail"));
const CheckVerification = lazy(() =>
  import("../pages /verify-email/CheckVerification")
);
const BookLaundry = lazy(() => import("../layout/BookLaundry"));
const LaundryPickup = lazy(() =>
  import("../pages /book-laundry/LaundryPickup")
);
const BookingSummary = lazy(() =>
  import("../pages /book-laundry/BookingSummary")
);

export default function AppRoutes() {
  const { accessToken } = useAuth();
  const routes = [
    {
       errorElement: <ErrorBoundary />,
      element: (
        <Suspense fallback={<LazySpinner />}>
          <PublicRoute accessToken={accessToken}>
            <AuthLayout />
          </PublicRoute>
        </Suspense>
      ),

      children: [
        {
          path: "auth/login",
          element: <Login />,
        },
        {
          path: "auth/createAccount",
          element: <CreateAccount />,
        },
      ],
    },
    {
       errorElement: <ErrorBoundary />,
      element: (
        <Suspense fallback={<LazySpinner />}>
          <PublicRoute accessToken={accessToken}>
            <ForgotLayout />
          </PublicRoute>
        </Suspense>
      ),

      children: [
        {
          path: "auth/forgotPassword",
          element: <ForgotPassword />,
        },
        {
          path: "auth/resetPassword",
          element: <ResetPassword />,
        },
      ],
    },
    {
      path: "verify-email/:userId/:verifyTokenLink",
       errorElement: <ErrorBoundary />,
      element: (
        <Suspense fallback={<LazySpinner />}>
          <PrivateRoute accessToken={accessToken}>
            <VerifyEmail />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
      path: "verify-email",
       errorElement: <ErrorBoundary />,
      element: (
        <Suspense fallback={<LazySpinner />}>
          <PrivateRoute accessToken={accessToken}>
            <CheckVerification />
          </PrivateRoute>
        </Suspense>
      ),
    },
    {
       errorElement: <ErrorBoundary />,
      element: (
        <Suspense fallback={<LazySpinner />}>
          <PrivateRoute accessToken={accessToken}>
            <BookLaundry />
          </PrivateRoute>
        </Suspense>
      ),
      children: [
        {
          path: "book-laundry",
           errorElement: <ErrorBoundary />,
          element: (
            <Suspense fallback={<LazySpinner />}>
              <PrivateRoute accessToken={accessToken}>
                <LaundryPickup />
              </PrivateRoute>
            </Suspense>
          ),
          children: [
            {
              path: "booking-summary",
               errorElement: <ErrorBoundary />,
              element: (
                <Suspense fallback={<LazySpinner />}>
                  <PrivateRoute accessToken={accessToken}>
                    <BookingSummary />
                  </PrivateRoute>
                </Suspense>
              ),
            },
            {
              path: "payment-options/:bookingId",
               errorElement: <ErrorBoundary />,
              element: (
                <Suspense fallback={<LazySpinner />}>
                  <PrivateRoute accessToken={accessToken}>
                    <PaymentOptions />
                  </PrivateRoute>
                </Suspense>
              ),
            },
          ],
        },
      ],
    },

    {
      path: "/",
      errorElement: <ErrorBoundary />,
      element: (
        <Suspense fallback={<LazySpinner />}>
          <RootLayout />
        </Suspense>
      ),

      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "profile",
           errorElement: <ErrorBoundary />,
          element: (
            <Suspense fallback={<LazySpinner />}>
              <PrivateRoute accessToken={accessToken}>
                <ProfileLayout />
              </PrivateRoute>
            </Suspense>
          ),
          children: [
            {
              path: "orders",
               errorElement: <ErrorBoundary />,
              element: (
                <PrivateRoute accessToken={accessToken}>
                  <Orders />
                </PrivateRoute>
              ),
            },
            {
              index: true,
              element: (
                <PrivateRoute accessToken={accessToken}>
                  <Profile />
                </PrivateRoute>
              ),
            },
            {
              path: "payments",
               errorElement: <ErrorBoundary />,
              element: (
                <PrivateRoute accessToken={accessToken}>
                  <Payment />
                </PrivateRoute>
              ),
            },
          ],
        },
      ],
    },
    {
      path: "admin",
       errorElement: <ErrorBoundary />,
      element: (
        <Suspense fallback={<LazySpinner />}>
          <PrivateRoute accessToken={accessToken}>
            <AdminLayout />
          </PrivateRoute>
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<LazySpinner />}>
              <PrivateRoute accessToken={accessToken}>
                <Dashboard />
              </PrivateRoute>
            </Suspense>
          ),
        },
        {
          path: "users",
           errorElement: <ErrorBoundary />,
          element: (
            <Suspense fallback={<LazySpinner />}>
              <PrivateRoute accessToken={accessToken}>
                <Users />
              </PrivateRoute>
            </Suspense>
          ),
        },
        {
          path: "orders",
           errorElement: <ErrorBoundary />,
          element: (
            <Suspense fallback={<LazySpinner />}>
              <PrivateRoute accessToken={accessToken}>
                <AdminOrders />
              </PrivateRoute>
            </Suspense>
          ),
        },
        {
          path: "revenue",
           errorElement: <ErrorBoundary />,
          element: (
            <Suspense fallback={<LazySpinner />}>
              <PrivateRoute accessToken={accessToken}>
                <Revenue />
              </PrivateRoute>
            </Suspense>
          ),
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}
