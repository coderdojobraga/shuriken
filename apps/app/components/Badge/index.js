import Link from "next/link";
import { Card, Skeleton } from "antd";
import styles from "./style.module.css";

const { Meta } = Card;

const Badge = ({ id, image, name, description, loading = false }) => {
  return (
    <Link href={`/badge/${id}`}>
      <a>
        <Card
          loading={loading}
          className={styles.card}
          hoverable
          style={{ width: 240 }}
          cover={
            loading ? (
              <Skeleton.Image className={styles.image} />
            ) : (
              /* eslint-disable @next/next/no-img-element */
              <img className={styles.image} alt={description} src={image} />
            )
          }
        >
          <Meta title={name} description={description} />
        </Card>
      </a>
    </Link>
  );
};

export default Badge;
