import { lazy } from "react";
import { createBrowserRouter, Navigate, type RouteObject } from "react-router-dom";

const App = lazy(() => import("../App"));
const LoginPage = lazy(() => import("../pages/Login/Login"));
const ProductListPage = lazy(() => import("../pages/ProductList/ProductList"));
const ProductDetailPage = lazy(() => import("../pages/ProductDetail/ProductDetail"));
const CartPage = lazy(() => import("../pages/Cart/Cart"));
const ProfilePage = lazy(() => import("../pages/Profile/Profile"));

const routes: RouteObject[] = [
  {
    path: "",
    Component: App,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/products",
        element: <ProductListPage />
      },
      {
        path: "/product/:id",
        element: <ProductDetailPage />
      },
      {
        path: "/cart",
        element: <CartPage />
      },
      {
        path: "/profile",
        element: <ProfilePage />
      },
    ],
  },
];


export const router = createBrowserRouter(routes);