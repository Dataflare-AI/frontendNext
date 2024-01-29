import Image from "next/image";
import styles from "./rightbar.module.css";
import { MdPlayCircleFilled, MdReadMore } from "react-icons/md";

const Rightbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.bgContainer}>
          <Image className={styles.bg} src="/astronaut.png" alt="" fill />
        </div>
        <div className={styles.text}>
          <span className={styles.notification}>📊 Disponível Agora</span>
          <h3 className={styles.title}>
            Desvendando o Poder do Painel de Análise de Dados
          </h3>
          <span className={styles.subtitle}>Descubra em 4 minutos</span>
          <p className={styles.desc}>
            Explore as últimas funcionalidades e aprimoramentos em nosso painel
            de análise de dados. Vamos guiá-lo na utilização de ferramentas
            poderosas para elevar a sua experiência analítica.
          </p>
          <button className={styles.button}>
            <MdPlayCircleFilled />
            Assista ao Tutorial
          </button>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.text}>
          <span className={styles.notification}>🚀 Em Breve</span>
          <h3 className={styles.title}>
            Novas Ações no Servidor e Pré-renderização Parcial a Caminho!
          </h3>
          <span className={styles.subtitle}>
            Aumente Sua Produtividade de Dados
          </span>
          <p className={styles.desc}>
            Prepare-se para uma onda de novas ações no servidor e a próxima
            funcionalidade de pré-renderização parcial. Eleve a sua
            produtividade de dados e mantenha-se à frente da curva com essas
            melhorias inovadoras.
          </p>
          <button className={styles.button}>
            <MdReadMore />
            Saiba Mais
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
