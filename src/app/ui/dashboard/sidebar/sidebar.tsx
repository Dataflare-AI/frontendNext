"use client";
import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";

import { MdNotifications } from "react-icons/md";
import { FaFileExcel } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import Link from "next/link";

const menuItems = [
  {
    // title: "Paginas",
    list: [
      // {
      //   title: "Home",
      //   path: "/dashboard",
      //   icon: <MdDashboard />,
      // },
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
    // title: "Análise",
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
  // {
  //   title: "Usuário",
  //   list: [
  //     {
  //       title: "Configurações",
  //       path: "/dashboard/settings",
  //       icon: <MdOutlineSettings />,
  //     },
  //     {
  //       title: "Ajuda",
  //       path: "/dashboard/help",
  //       icon: <MdHelpCenter />,
  //     },
  //   ],
  // },
];

const logoutItem = {
  title: "Sair",
  path: "/",
  icon: <CiLogout size={20} />,
};

export default function Sidebar() {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          // className={styles.userImage}
          src={"/noavatar.png"}
          alt=""
          width="30"
          height="30"
          className={styles.userImage}
        />
        <div className={styles.userDetail}>
          <span className={styles.userTitle}>Administrator</span>
        </div>
        <MdNotifications size={20} />
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat, index) => (
          <li key={index}>
            <span className={styles.cat}></span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <Link href={"/"}>
        <button className={styles.logout}>
          {logoutItem.icon} {logoutItem.title}
        </button>
      </Link>
    </div>
  );
}
