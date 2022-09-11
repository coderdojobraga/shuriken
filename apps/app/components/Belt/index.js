import { Tag } from "antd";
import { EBelt } from "bokkenjs";
import { BELT_PT } from "~/lib/belt";

import styles from "./style.module.css";

export default function Belt({ belt }) {
  return (
    <Tag
      className={!belt ? styles.nobelt : styles.capitalize}
      color={(belt !== EBelt.White && belt !== EBelt.Missing) || null}
    >
      {BELT_PT[belt]}
    </Tag>
  );
}
