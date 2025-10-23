// App Imports (now direct component imports)

import Home from "@/pages/home";
import HowItWorks from "@/pages/how-it-works";
import Men from "@/pages/men";
import WhatsNew from "@/pages/whats-new";
import Women from "@/pages/women";


export const homeRoutes = {
  home: {
    path: "/",
    element: <Home />,
  },
  men: {
    path: "/men",
    element: <Men />,
  },
  women: {
    path: "/women",
    element: <Women />,
  },
  howItWorks: {
    path: "/how-it-works",
    element: <HowItWorks />,
  },
  whatsNew: {
    path: "/whats-new",
    element: <WhatsNew />,
  },
}
