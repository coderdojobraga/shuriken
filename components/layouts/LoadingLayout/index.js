import { Row } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import ContentLayout from "~/components/layouts/ContentLayout";

function Loading() {
  return (
    <ContentLayout>
      <Row justify="center" align="middle">
        <LoadingOutlined style={{ fontSize: 36 }} spin />
      </Row>
    </ContentLayout>
  );
}

export default Loading;
