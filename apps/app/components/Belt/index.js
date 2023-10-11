import { Tag } from "antd";
import { BELT_PT } from "~/lib/belt";

import styles from "./style.module.css";

export default function Belt({ belt }) {
  const isWhite = belt === "white";

  return (
    <Tag
      className={!belt ? styles.nobelt : styles.capitalize}
      color={belt}
      style={isWhite ? { border: "1px solid grey", color: "grey" } : {}}
    >
      {!belt ? BELT_PT[""] : BELT_PT[belt]}
    </Tag>
  );
}
