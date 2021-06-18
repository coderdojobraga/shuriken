import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Avatar, Card, Col, List, Row, Skeleton, Tag, Typography } from "antd";
import { withAuth } from "~/components/Auth";
import AppLayout from "~/components/layouts/AppLayout";
import * as api from "~/lib/utils/api";
import * as BELT from "~/lib/utils/belt";

import styles from "./style.module.css";

const { Title, Text } = Typography;

function Badge() {
  const router = useRouter();
  const { id } = router.query;
  const [isLoadingBadge, setLoadingBadge] = useState(false);
  const [isLoadingNinjas, setLoadingNinjas] = useState(false);
  const [badge, setBadge] = useState({});
  const [ninjas, setNinjas] = useState([]);

  useEffect(() => {
    setLoadingBadge(true);
    api
      .getBadge(id)
      .then((response) => setBadge(response.data))
      .catch(() => {})
      .finally(() => setLoadingBadge(false));

    setLoadingNinjas(true);
    api
      .getBadgeNinjas(id)
      .then((response) => setNinjas(response.data))
      .catch(() => {})
      .finally(() => setLoadingNinjas(false));
  }, [id]);

  return (
    <AppLayout>
      <Row justify="start">
        <Col {...{ xs: 24, md: 12, xl: 8, xxl: 8 }}>
          <Card
            loading={isLoadingBadge}
            className={styles.badge}
            bordered={false}
            cover={
              isLoadingBadge ? (
                <Skeleton.Image />
              ) : (
                <img alt={badge.description} src={badge.image} />
              )
            }
          >
            <Title level={3}>{badge.name}</Title>
            <Text>{badge.description}</Text>
          </Card>
        </Col>
        <Col {...{ xs: 24, md: 12, xl: 16, xxl: 16 }}>
          <List
            header={<Title level={2}>Ninjas</Title>}
            itemLayout="horizontal"
            dataSource={ninjas}
            loading={isLoadingNinjas}
            renderItem={(ninja) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar size={64} src={ninja.photo} />}
                  title={`${ninja.first_name} ${ninja.last_name}`}
                  description={
                    <Tag
                      className={
                        ninja.belt === BELT.LEVELS.NO_BELT
                          ? styles.nobelt
                          : styles.belt
                      }
                      color={
                        (ninja.belt !== BELT.LEVELS.WHITE && ninja.belt) || null
                      }
                    >
                      {BELT.PT[ninja.belt]}
                    </Tag>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </AppLayout>
  );
}

export default withAuth(Badge);
