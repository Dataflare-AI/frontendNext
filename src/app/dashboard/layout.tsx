import React, { ReactNode } from "react";
import Navbar from "../ui/dashboard/navbar/navbar";
import Sidebar from "../ui/dashboard/sidebar/sidebar";
import styles from "../ui/dashboard/dashboard.module.css";
import Footer from "../ui/dashboard/footer/footer";
import "src/app/globals.css";
import SessionProvider from "../SessionProvider";

// Defina o tipo de sessão no formato esperado pelo SessionProvider
interface NextAuthSession {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  expires: Date; // Adicione a propriedade 'expires' ao tipo
}

export default function RootLayout({ children }: { children: ReactNode }) {
  // Crie uma sessão compatível com o tipo esperado
  const session: NextAuthSession = {
    name: "User Name",
    email: "user@example.com",
    image: "https://example.com/avatar.png",
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias em milissegundos
  };

  return (
    <SessionProvider session={session}>
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
  );
}
