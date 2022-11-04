import { Tag } from "antd";
import { BELT_PT } from "~/lib/belt";

import styles from "./style.module.css";

export default function Belt({ belt }) {
  return (
    <Tag className={!belt ? styles.nobelt : styles.capitalize} color={belt}>
      {!belt ? BELT_PT[""] : BELT_PT[belt]}
    </Tag>
  );
}
