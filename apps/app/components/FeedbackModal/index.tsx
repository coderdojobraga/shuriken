import { Input, Modal, Tabs } from "antd";
import React, { useEffect, useState } from "react";

interface TabInfo {
  tabTitle: string;
  info: string;
}

interface DynamicTabsProps {
  visible: boolean;
  onClose: () => void;
  tabsInfo: TabInfo[];
  modalTitle: string;
}

const FeedbackModal: React.FC<DynamicTabsProps> = ({
  visible,
  onClose,
  tabsInfo,
  modalTitle,
}) => {
  const [activeTab, setActiveTab] = useState<string>("");
  const [tabInfo, setTabInfo] = useState<string>("");

  useEffect(() => {
    if (tabsInfo.length > 0) {
      setActiveTab(tabsInfo[0].tabTitle);
      setTabInfo(tabsInfo[0].info);
    }
  }, [tabsInfo]);

  const handleTabChange = (key: string) => {
    const selectedTab = tabsInfo.find((tab) => tab.tabTitle === key);
    if (selectedTab) {
      setActiveTab(selectedTab.tabTitle);
      setTabInfo(selectedTab.info);
    }
  };

  return (
    <Modal
      title={modalTitle}
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        {tabsInfo.map((tab) => (
          <Tabs.TabPane tab={tab.tabTitle} key={tab.tabTitle}>
            <Input.TextArea
              value={tabInfo}
              rows={25}
              style={{ resize: "none" }}
              placeholder="Nenhuma informação para apresentar"
              readOnly={true}
            />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </Modal>
  );
};

export default FeedbackModal;
