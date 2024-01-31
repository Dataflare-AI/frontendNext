import { cards } from "@/app/lib/data";
import Card from "@/app/ui/dashboard/card/card";
import Chart from "@/app/ui/dashboard/chart/chart";
import styles from "@/app/ui/dashboard/dashboard.module.css";
import Rightbar from "@/app/ui/dashboard/rightbar/rightbar";
import Requests from "@/app/ui/dashboard/requests/requests";
import { signOut, useSession } from "next-auth/react";

const Dashboard = () => {
  // const session = useSession();
  return (
    <div>
      {/* <div>{session?.data?.user?.name}</div> */}
      {/* <button onClick={() => signOut()}>Logout</button> */}
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <div className={styles.cards}>
            {cards.map((item) => (
              <Card item={item} key={item.id} />
            ))}
          </div>
          <Requests />
          <Chart />
        </div>
        <div className={styles.side}>
          <Rightbar />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
