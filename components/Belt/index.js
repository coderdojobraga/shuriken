import { Col, Tag } from "antd";
import * as BELT from "~/lib/belt";

import styles from "./style.module.css";

function Belt({ belt }) {
  return (
    <>
      {belt ? (
        <Col span={24}>
          <Tag
            className={!belt ? styles.nobelt : styles.capitalize}
            color={(belt !== BELT.LEVELS.WHITE && belt) || null}
          >
            {BELT.PT[belt]}
          </Tag>
        </Col>
      ) : null}
    </>
  );
}

export default Belt;
