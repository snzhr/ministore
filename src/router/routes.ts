import React, { lazy } from "react";
import {
  createBrowserRouter,
  Navigate,
  type RouteObject,
} from "react-router-dom";
import App from "../App";

const LoginPage = lazy(() => import("../pages/Login/Login"));
const ProductListPage = lazy(() => import("../pages/ProductList/ProductList"));
const ProductDetailPage = lazy(
  () => import("../pages/ProductDetail/ProductDetail")
);
const CartPage = lazy(() => import("../pages/Cart/Cart"));
const ProfilePage = lazy(() => import("../pages/Profile/Profile"));
const NotFoundPage = lazy(() => import("../pages/NotFound/NotFound"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/products" replace />,
      },
      {
        path: "/products",
        element: <ProductListPage />,
      },
      {
        path: "/products/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
];

export const router = createBrowserRouter(routes);
