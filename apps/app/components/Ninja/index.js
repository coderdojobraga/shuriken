import React, { useState } from "react";
import { Avatar, Button, Card, Popconfirm, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import Belt from "~/components/Belt";
import Link from "next/link";
import NinjaForm from "~/components/NinjaForm";

const { Meta } = Card;

function Ninja(ninja) {
  const [showNinjaForm, setShowNinjaForm] = useState(false);
  const [showPopconfirm, setShowPopconfirm] = useState(false);

  const handleButtonClick = () => {
    setShowNinjaForm(false);
    setShowPopconfirm(true);
  };

  const handleConfirm = () => {
    setShowNinjaForm(true);
    setShowPopconfirm(false);
  };

  const handleCancel = () => {
    setShowPopconfirm(false);
  };

  return (
    <Card
      key={ninja.id}
      size="large"
      style={{ width: 300, marginTop: 16 }}
      actions={[
        <Popconfirm
          key={`popconfirm ${ninja.id}`}
          title="Tem certeza que deseja editar?"
          open={showPopconfirm}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        >
          <Button
            key={`button ${ninja.id}`}
            icon={<EditOutlined />}
            onClick={handleButtonClick}
          />
        </Popconfirm>,
      ]}
    >
      {showNinjaForm && <NinjaForm id={ninja.id} reloadNinjas={null} />}
      <Link href={`/profile/ninja/${ninja.id}`}>
        <a>
          <Meta
            avatar={<Avatar src={ninja.photo} />}
            title={`${ninja.first_name} ${ninja.last_name}`}
            style={{ marginBottom: "10px" }}
          />
          <Belt belt={ninja.belt} />
        </a>
      </Link>
    </Card>
  );
}

export default Ninja;
