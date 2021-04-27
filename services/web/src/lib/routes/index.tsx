import { UserRoleName } from "lib/types/role";
import React from "react";
import { FiHome, FiUsers } from "react-icons/fi";

interface IRoute {
  title: string;
  route: string;
  icon: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

const routes: { [key in UserRoleName]?: IRoute[] } = {
  [UserRoleName.SUPERVISOR]: [
    {
      title: "Inicio",
      route: "/dashboard",
      icon: <FiHome />,
    },
  ],
  [UserRoleName.ALLY]: [
    {
      title: "Inicio",
      route: "/dashboard",
      icon: <FiHome />,
    },
  ],
  [UserRoleName.SUPERADMIN]: [
    {
      title: "Inicio",
      route: "/dashboard",
      icon: <FiHome />,
    },
    {
      title: "Usuarios",
      route: "/admin",
      icon: <FiUsers />,
    },
  ],
  [UserRoleName.TUTOR]: [
    {
      title: "Inicio",
      route: "/dashboard",
      icon: <FiHome />,
    },
  ],
};

export default routes;
