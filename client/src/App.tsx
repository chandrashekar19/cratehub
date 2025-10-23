import { BrowserRouter } from "react-router-dom"
import { HelmetProvider } from "react-helmet-async"
import { Toaster } from "@/components/ui/sonner"

import { AppRoutes } from "./app-routes"
import Layout from "./components/layout"

export function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>

        {/* Global toast notifications */}
        <Toaster richColors position="top-right" />
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
