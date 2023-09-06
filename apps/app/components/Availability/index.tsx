import { Avatar, List, Row, Switch, Typography } from "antd";
import Link from "next/link";

const { Title } = Typography;

function Availability({
  title,
  buttonTitle,
  mentors,
  available,
  setAvailable,
}: any) {
  return (
    <>
      <Row style={{ display: "flex", justifyContent: "space-between" }}>
        <Title level={2}>{title}</Title>
        <Switch
          defaultChecked={available}
          style={{ float: "right" }}
          onClick={(_) => setAvailable(!available)}
        />
      </Row>
      <List
        itemLayout="vertical"
        dataSource={mentors}
        renderItem={(mentor: any) => (
          <List.Item style={{ cursor: "pointer" }}>
            <Link href={`/profile/mentor/${mentor.id}`}>
              <List.Item.Meta
                avatar={<Avatar size={64} src={mentor.photo} />}
                title={`${mentor.first_name} ${mentor.last_name}`}
                description={mentor.notes ? `Notas: ${mentor.notes}` : ""}
              />
            </Link>
          </List.Item>
        )}
      />
    </>
  );
}

export default Availability;
