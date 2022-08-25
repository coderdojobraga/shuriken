import { Avatar, Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import Belt from "~/components/Belt";
import Link from "next/link";
import LinkTo from "~/components/utils/LinkTo";

const { Meta } = Card;

function Ninja(ninja) {
  return (
    <Card
      key={ninja.id}
      size="large"
      style={{ width: 300, marginTop: 16 }}
      actions={[
        <Link key={`link ${ninja.id}`} href={`/ninjas/edit/${ninja.id}`}>
          <a>
            <EditOutlined key="edit" />
          </a>
        </Link>,
      ]}
    >
      <LinkTo href={`/profile/ninja/${ninja.id}`}>
        <Meta
          avatar={<Avatar src={ninja.photo} />}
          title={`${ninja.first_name} ${ninja.last_name}`}
        />
        <Belt belt={ninja.belt} />
      </LinkTo>
    </Card>
  );
}

export default Ninja;
