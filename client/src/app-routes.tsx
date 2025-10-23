import { Routes, Route } from "react-router-dom"
import { homeRoutes } from "./routes/home-routes"
import { userRoutes } from "./routes/user-routes"
import { RoutePrivate } from "./auth/private-route"
import { crateRoutes } from "./routes/crate-routes"
import { productRoutes } from "./routes/product-routes"
import { adminRoutes } from "./routes/admin-routes"
import NotFound from "./components/common/not-found"

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Home Routes */}
      <Route path={homeRoutes.home.path} element={homeRoutes.home.element} />
      <Route path={homeRoutes.men.path} element={homeRoutes.men.element} />
      <Route path={homeRoutes.women.path} element={homeRoutes.women.element} />
      <Route path={homeRoutes.howItWorks.path} element={homeRoutes.howItWorks.element} />
      <Route path={homeRoutes.whatsNew.path} element={homeRoutes.whatsNew.element} />

      {/* Public Auth Routes */}
      <Route path={userRoutes.login.path} element={userRoutes.login.element} />
      <Route path={userRoutes.signup.path} element={userRoutes.signup.element} />

      {/* Auth Protected User Routes */}
      <Route element={<RoutePrivate />}>
        <Route path={userRoutes.profile.path} element={userRoutes.profile.element} />
        <Route path={userRoutes.subscriptions.path} element={userRoutes.subscriptions.element} />
        <Route path={crateRoutes.list.path} element={crateRoutes.list.element} />
      </Route>

      {/* Product Dynamic Route */}
      <Route path={productRoutes.product.path()} element={productRoutes.product.element} />

      {/* Admin Protected Routes */}
      <Route element={<RoutePrivate role="ADMIN" />}>
        <Route path={adminRoutes.dashboard.path} element={adminRoutes.dashboard.element} />
        <Route path={adminRoutes.productList.path} element={adminRoutes.productList.element} />
        <Route path={adminRoutes.productCreate.path} element={adminRoutes.productCreate.element} />
        <Route path={adminRoutes.productEdit.path()} element={adminRoutes.productEdit.element} />
        <Route path={adminRoutes.crateList.path} element={adminRoutes.crateList.element} />
        <Route path={adminRoutes.crateCreate.path} element={adminRoutes.crateCreate.element} />
        <Route path={adminRoutes.crateEdit.path()} element={adminRoutes.crateEdit.element} />
        <Route path={adminRoutes.subscriptionList.path} element={adminRoutes.subscriptionList.element} />
        {/* <Route path={adminRoutes.userList.path} element={adminRoutes.userList.element} /> */}
      </Route>

      {/* Catch-all Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
