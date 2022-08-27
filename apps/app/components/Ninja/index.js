import { Avatar, Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import Belt from "~/components/Belt";
import Link from "next/link";

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
      <Link href={`/profile/ninja/${ninja.id}`}>
        <a>
          <Meta
            avatar={<Avatar src={ninja.photo} />}
            title={`${ninja.first_name} ${ninja.last_name}`}
          />
          <Belt belt={ninja.belt} />
        </a>
      </Link>
    </Card>
  );
}

export default Ninja;
