import { Space } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Layout from "./index";

function Loading() {
  return (
    <Layout>
      <Space>
        <LoadingOutlined style={{ fontSize: 36 }} spin />
      </Space>
    </Layout>
  );
}

export default Loading;
