import Link from "next/link";
import { useRouter } from "next/router";
import { Avatar, Card, Col, List, Row, Skeleton, Typography } from "antd";
import { useBadge } from "~/hooks/badges";
import { withAuth } from "~/components/Auth";
import AppLayout from "~/layouts/AppLayout";
import Belt from "~/components/Belt";

import styles from "./style.module.css";

const { Title, Text } = Typography;

function Badge() {
  const router = useRouter();
  const { id } = router.query;
  const { data: badge, isLoading } = useBadge(id as string, ["ninjas"]);

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
                /* eslint-disable @next/next/no-img-element */
                <img
                  className={styles.image}
                  src={badge?.image}
                  alt={badge?.description}
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
            renderItem={(ninja: any) => (
              <List.Item>
                <Link href={`/profile/ninja/${ninja.id}`}>
                  <a>
                    <List.Item.Meta
                      avatar={<Avatar size={64} src={ninja.photo} />}
                      title={`${ninja.first_name} ${ninja.last_name}`}
                      description={<Belt belt={ninja.belt} />}
                    />
                  </a>
                </Link>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </AppLayout>
  );
}

export default withAuth(Badge);
