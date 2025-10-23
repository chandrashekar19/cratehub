// src/routes/admin.tsx

import { AdminDashboard } from "@/components/admin-dashboard"
import { CrateList } from "@/components/crate/crate-list"
import { CrateForm } from "@/components/crate/create-form"
import { ProductForm } from "@/components/products/product-form"
import { ProductList } from "@/components/products/products-list"
import { SubscriptionList } from "@/components/subscriptions/subscription-list"

// Role constants (optional)
export const roles = {
  ADMIN: "ADMIN",
  USER: "USER",
}

export const adminRoutes = {
  dashboard: {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
    auth: true,
    role: roles.ADMIN,
  },

  productList: {
    path: "/admin/products",
    element: <ProductList />,
    auth: true,
    role: roles.ADMIN,
  },
  productCreate: {
    path: "/admin/product/create",
    element: <ProductForm />,
    auth: true,
    role: roles.ADMIN,
  },
  productEdit: {
    path: (id = ":id") => `/admin/product/${id}/edit`,
    element: <ProductForm />,
    auth: true,
    role: roles.ADMIN,
  },

  //  Crates
  crateList: {
    path: "/admin/crates",
    element: <CrateList />,
    auth: true,
    role: roles.ADMIN,
  },
  crateCreate: {
    path: "/admin/crate/create",
    element: <CrateForm />,
    auth: true,
    role: roles.ADMIN,
  },
  crateEdit: {
    path: (id = ":id") => `/admin/crate/${id}/edit`,
    element: <CrateForm />,
    auth: true,
    role: roles.ADMIN,
  },

  //  Subscriptions
  subscriptionList: {
    path: "/admin/subscriptions",
    element: <SubscriptionList />,
    auth: true,
    role: roles.ADMIN,
  },

  //  Users (placeholder)
  // userList: {
  //   path: "/admin/users",
  //   element: <AdminUserList />,
  //   auth: true,
  //   role: roles.ADMIN,
  // },
}
