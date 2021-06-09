import { Card, Skeleton } from "antd";

import styles from "./style.module.css";

const { Meta } = Card;

const Badge = ({ image, name, description, loading = false }) => {
  return (
    <Card
      loading={loading}
      className={styles.card}
      hoverable
      style={{ width: 240 }}
      cover={
        loading ? (
          <Skeleton.Image className={styles.image} />
        ) : (
          <img className={styles.image} alt={description} src={image} />
        )
      }
    >
      <Meta title={name} description={description} />
    </Card>
  );
};

export default Badge;
