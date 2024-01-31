"use client";
import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";

import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";
import { FaFileExcel } from "react-icons/fa";

const menuItems = [
  {
    title: "Paginas",
    list: [
      {
        title: "Home",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      // {
      //   title: "Usuários",
      //   path: "/dashboard/users",
      //   icon: <MdSupervisedUserCircle />,
      // },
      // {
      //   title: "Products",
      //   path: "/dashboard/products",
      //   icon: <MdShoppingBag />,
      // },
      // {
      //   title: "Transactions",
      //   path: "/dashboard/transactions",
      //   icon: <MdAttachMoney />,
      // },
    ],
  },
  {
    title: "Análise",
    list: [
      {
        title: "Importação",
        path: "/dashboard/importFiles",
        icon: <FaFileExcel />,
      },
      // {
      //   title: "Reports",
      //   path: "/dashboard/reports",
      //   icon: <MdAnalytics />,
      // },
      // {
      //   title: "Teams",
      //   path: "/dashboard/teams",
      //   icon: <MdPeople />,
      // },
    ],
  },
  {
    title: "Usuário",
    list: [
      {
        title: "Configurações",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
      {
        title: "Ajuda",
        path: "/dashboard/help",
        icon: <MdHelpCenter />,
      },
    ],
  },
];

export default function Sidebar() {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          // className={styles.userImage}
          src={"/noavatar.png"}
          alt=""
          width="50"
          height="50"
        />
        <div className={styles.userDetail}>
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
