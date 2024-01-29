import Image from "next/image";
import styles from "./requests.module.css";

const Requests = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Últimas Requisições</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Nome</td>
            <td>Status</td>
            <td>Data</td>
            <td>N° de Requisições</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                User1{" "}
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>
                Pendente
              </span>
            </td>
            <td>14.02.2024</td>
            <td>32.000</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                User2{" "}
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.done}`}>Sucesso</span>
            </td>
            <td>19.02.2024</td>
            <td>5.700</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                User3
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.cancelled}`}>
                Cancelado
              </span>
            </td>
            <td>10.02.2024</td>
            <td>0</td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                User4
              </div>
            </td>
            <td>
              <span className={`${styles.status} ${styles.pending}`}>
                Sucesso
              </span>
            </td>
            <td>20.02.2024</td>
            <td>1.000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Requests;
