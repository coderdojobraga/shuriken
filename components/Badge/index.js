import { Card, Skeleton } from "antd";
import LinkTo from "~/components/utils/LinkTo";

import styles from "./style.module.css";

const { Meta } = Card;

const Badge = ({ id, image, name, description, loading = false }) => {
  return (
    <LinkTo href={`/badge/${id}`}>
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
    </LinkTo>
  );
};

export default Badge;
