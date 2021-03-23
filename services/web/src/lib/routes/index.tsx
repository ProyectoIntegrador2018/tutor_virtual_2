import { UserRoleName } from "lib/types/role";
import React from "react";
import { FiHome } from "react-icons/fi";

interface IRoute {
  title: string;
  route: string;
  icon: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  auth: UserRoleName[];
}

const routes: IRoute[] = [
  {
    title: "Inicio",
    route: "/dashboard",
    icon: <FiHome />,
    auth: [UserRoleName.TUTOR],
  },
];

const authRoutes = [];

routes.map((route) => {
  authRoutes[route.route] = route.auth;
});

export { authRoutes };

export default routes;
