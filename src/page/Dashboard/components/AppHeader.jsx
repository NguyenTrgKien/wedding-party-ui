import { Header } from "antd/es/layout/layout";
import { useTheme } from "../../../context/themeContext";
import { Avatar, Badge, Button, Select, Space } from "antd";
import ThemeSwitcher from "./ThemeSwitcher";
import { BellOutlined, PlusOutlined, SettingOutlined } from "@ant-design/icons";

function AppHeader({ currentTheme, onThemeChange }) {
  const { t } = useTheme();
  return (
    <Header
      style={{
        background: t.headerBg,
        borderBottom: `1px solid ${t.border}`,
        padding: "0 28px",
        height: 60,
        display: "flex",
        alignItems: "center",
        lineHeight: "normal",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 5,
        transition: "background .3s",
      }}
    >
      <div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: t.text,
            lineHeight: 1,
          }}
        >
          Dashboard
        </div>
        <div style={{ fontSize: 12, color: t.textMuted, marginTop: 1 }}>
          Thứ Năm, 19 tháng 2, 2026
        </div>
      </div>
      <Space size={12} align="center">
        <ThemeSwitcher currentTheme={currentTheme} onChange={onThemeChange} />
        <Select
          defaultValue="30"
          size="middle"
          style={{ width: 140 }}
          options={[
            { value: "7", label: "7 ngày qua" },
            { value: "30", label: "30 ngày qua" },
            { value: "90", label: "90 ngày qua" },
            { value: "365", label: "Năm nay" },
          ]}
        />
        <Badge dot color="red" offset={[-4, 4]}>
          <Button icon={<BellOutlined />} />
        </Badge>
        <Button icon={<SettingOutlined />} />
        <Avatar
          size={36}
          src="https://hoiquancaothu.com/images/skins/lien-quan/zuka-gau-nhoi-bong.jpg?q=1?v=2.0.0.1"
          alt="avatar admin"
        />
      </Space>
    </Header>
  );
}

export default AppHeader;
