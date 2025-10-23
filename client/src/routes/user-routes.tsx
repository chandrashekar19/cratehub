import Login from "@/auth/user/login-page";
import Signup from "@/auth/user/sign-up";
import UserProfile from "@/auth/user/user-profile";
import UserSubscriptions from "@/auth/user/user-subscriptions";

export const userRoutes = {
  login: {
    path: "/user/login",
    element: <Login />,
  },
  signup: {
    path: "/user/signup",
    element: <Signup />,
  },
  profile: {
    path: "/user/profile",
    element: <UserProfile />,
    auth: true, // flag for private route
  },
  subscriptions: {
    path: "/user/subscriptions",
    element: <UserSubscriptions />,
    auth: true, // flag for private route
  },
}
