import { CrateList } from "@/components/crate/crate-list";

export const crateRoutes = {
  list: {
    path: "/crates",
    element: <CrateList />,
    auth: true,
  },
}
