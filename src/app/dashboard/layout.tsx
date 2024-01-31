import React, { ReactNode } from "react";
import Navbar from "../ui/dashboard/navbar/navbar";
import Sidebar from "../ui/dashboard/sidebar/sidebar";
import styles from "../ui/dashboard/dashboard.module.css";
import Footer from "../ui/dashboard/footer/footer";
import "src/app/globals.css";
import SessionProvider from "../SessionProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <div className={styles.container}>
            <div className={styles.menu}>
              <Sidebar />
            </div>
            <div className={styles.content}>
              <Navbar />
              {children}
              <Footer />
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
