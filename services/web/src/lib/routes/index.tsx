import { UserRoleName } from "lib/types/role";
import React from "react";
import {
  FiHome,
  FiStar,
  FiUsers,
  FiCalendar,
  FiBookOpen,
} from "react-icons/fi";
import { HiOutlineDocument } from "react-icons/hi";

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
    {
      title: "Aliados",
      route: "/allies",
      icon: <FiStar />,
    },
    {
      title: "Tutores",
      route: "/supervisor",
      icon: <FiUsers />,
    },
    {
      title: "Guías",
      route: "/guides",
      icon: <HiOutlineDocument />,
    },
  ],
  [UserRoleName.ALLY]: [
    {
      title: "Inicio",
      route: "/dashboard",
      icon: <FiHome />,
    },
    {
      title: "Guías",
      route: "/guides",
      icon: <HiOutlineDocument />,
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
      route: "/admin/users",
      icon: <FiUsers />,
    },
    {
      title: "Aliados",
      route: "/allies",
      icon: <FiStar />,
    },
    {
      title: "Aperturas",
      route: "/seasons",
      icon: <FiCalendar />,
    },
    {
      title: "Cursos",
      route: "/courses",
      icon: <FiBookOpen />,
    },
    {
      title: "Guías",
      route: "/guides",
      icon: <HiOutlineDocument />,
    },
  ],
  [UserRoleName.TUTOR]: [
    {
      title: "Inicio",
      route: "/dashboard",
      icon: <FiHome />,
    },
    {
      title: "Guías",
      route: "/guides",
      icon: <HiOutlineDocument />,
    },
  ],
};

export default routes;
