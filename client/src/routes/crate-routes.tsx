import { CrateCards } from "@/components/crate/crate-cards";

export const crateRoutes = {
  list: {
    path: "/crates",
    element: <CrateCards />,
    auth: true,
  },
}
