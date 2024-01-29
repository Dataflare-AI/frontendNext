import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css";

interface CardProps {
  item: {
    id: number;
    title: string;
    number: number;
    change: number;
  };
}

const Card: React.FC<CardProps> = ({ item }) => {
  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle size={24} />
      <div className={styles.texts}>
        <span className={styles.title}>{item.title}</span>
        <span className={styles.number}>{item.number}</span>
        <span className={styles.detail}>
          <span className={item.change > 0 ? styles.positive : styles.negative}>
            {item.change}%
          </span>{" "}
          {item.change > 0 ? "maior" : "menor"} do que na semana anterior
        </span>
      </div>
    </div>
  );
};

export default Card;
