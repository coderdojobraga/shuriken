import { useRouter } from "next/router";
import { Avatar, Card, Col, List, Row, Skeleton, Tag, Typography } from "antd";
import { useBadge } from "~/hooks/badges";
import { withAuth } from "~/components/Auth";
import AppLayout from "~/components/layouts/AppLayout";
import LinkTo from "~/components/utils/LinkTo";
import * as BELT from "~/lib/belt";

import styles from "./style.module.css";

const { Title, Text } = Typography;

function Badge() {
  const router = useRouter();
  const { id } = router.query;
  const { data: badge, isLoading } = useBadge(id, ["ninjas"]);

  return (
    <AppLayout>
      <Row justify="start">
        <Col {...{ xs: 24, md: 12, xl: 8, xxl: 8 }}>
          <Card
            loading={isLoading}
            className={styles.badge}
            bordered={false}
            cover={
              isLoading ? (
                <Skeleton.Image />
              ) : (
                <img
                  className={styles.image}
                  alt={badge?.description}
                  src={badge?.image}
                />
              )
            }
          >
            <Title level={3}>{badge?.name}</Title>
            <Text>{badge?.description}</Text>
          </Card>
        </Col>
        <Col {...{ xs: 24, md: 12, xl: 16, xxl: 16 }}>
          <List
            header={<Title level={2}>Ninjas</Title>}
            itemLayout="horizontal"
            dataSource={badge?.ninjas}
            loading={isLoading}
            renderItem={(ninja) => (
              <List.Item>
                <LinkTo href={`/profile/ninja/${ninja.id}`}>
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
                          (ninja.belt !== BELT.LEVELS.WHITE && ninja.belt) ||
                          null
                        }
                      >
                        {BELT.PT[ninja.belt]}
                      </Tag>
                    }
                  />
                </LinkTo>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </AppLayout>
  );
}

export default withAuth(Badge);
