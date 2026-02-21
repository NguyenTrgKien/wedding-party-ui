import { useState } from "react";
import { Table, Tag, Button, Input, Select, Space, Tooltip } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  PhoneOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { useTheme } from "../../../context/themeContext";
import dayjs from "dayjs";
import ActionModal from "./ActionModal";
import EditStatusModal, { STATUS } from "./EditStatusModal";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const MOCK_BOOKINGS = [
  {
    key: 1,
    id: "TW-2024-001",
    groom: "Nguyễn Văn Minh",
    bride: "Trần Thị Lan",
    phone: "0901234567",
    date: "2026-03-15",
    hall: {
      id: 1,
      name: "Sảnh Hoa Sen",
      capacity: 30,
      price: 5000000,
      description: "Sảnh nhỏ, ấm cúng, phù hợp tiệc gia đình",
      image:
        "https://luxurypalace.vn/wp-content/uploads/2024/10/241105-Luxury-Palace-068-1-1024x575.jpg",
    },
    tables: 30,
    menu: "Gói Bạch Kim",
    deposit: 20000000,
    total: 85000000,
    status: "completed",
    createdAt: "2025-12-10",
    note: "Khách VIP, cần hoa tươi đặc biệt",
  },
  {
    key: 2,
    id: "TW-2024-002",
    groom: "Lê Hoàng Nam",
    bride: "Phạm Thị Hoa",
    phone: "0912345678",
    date: "2026-04-20",
    hall: {
      id: 2,
      name: "Sảnh Hồng Ngọc",
      capacity: 50,
      price: 8000000,
      description: "Thiết kế sang trọng, phù hợp tiệc trung bình",
      image:
        "https://asiana-plaza.com/wp-content/uploads/2021/03/trang-tri-sanh-tiec-cuoi-dep-3.jpg",
    },
    tables: 45,
    menu: "Gói Kim Cương",
    deposit: 30000000,
    total: 135000000,
    status: "deposited",
    createdAt: "2026-01-05",
    note: "",
  },
  {
    key: 3,
    id: "TW-2024-003",
    groom: "Trần Đức Long",
    bride: "Nguyễn Thị Mai",
    phone: "0923456789",
    date: "2026-05-08",
    hall: {
      id: 3,
      name: "Sảnh Kim Cương",
      capacity: 80,
      price: 12000000,
      description: "Sảnh lớn, trần cao, sân khấu rộng",
      image:
        "https://asiana-plaza.com/wp-content/uploads/2021/03/sanh-cuoi-dep-nhat-1.jpg",
    },
    tables: 25,
    menu: "Gói Vàng",
    deposit: 0,
    total: 62000000,
    status: "confirmed",
    createdAt: "2026-01-18",
    note: "Yêu cầu setup ban nhạc live",
  },
  {
    key: 4,
    id: "TW-2024-004",
    groom: "Võ Thanh Tùng",
    bride: "Đặng Thị Thu",
    phone: "0934567890",
    date: "2026-05-22",
    hall: {
      id: 4,
      name: "Sảnh Hoàng Gia",
      capacity: 120,
      price: 18000000,
      description: "Phong cách châu Âu, dành cho tiệc cao cấp",
      image:
        "https://mgs-storage.sgp1.digitaloceanspaces.com/gala/2024/01/sanh-tiec-autumn-to-chuc-tiec-tan-nien-tai-trung-tam-to-chuc-hoi-nghi-tphcm-gala-center.jpeg",
    },
    tables: 20,
    menu: "Gói Bạc",
    deposit: 0,
    total: 45000000,
    status: "pending",
    createdAt: "2026-02-01",
    note: "",
  },
  {
    key: 5,
    id: "TW-2024-005",
    groom: "Hoàng Văn Đức",
    bride: "Lý Thị Ngọc",
    phone: "0945678901",
    date: "2026-06-12",
    hall: {
      id: 4,
      name: "Sảnh Hoàng Gia",
      capacity: 120,
      price: 18000000,
      description: "Phong cách châu Âu, dành cho tiệc cao cấp",
      image:
        "https://mgs-storage.sgp1.digitaloceanspaces.com/gala/2024/01/sanh-tiec-autumn-to-chuc-tiec-tan-nien-tai-trung-tam-to-chuc-hoi-nghi-tphcm-gala-center.jpeg",
    },
    tables: 35,
    menu: "Gói Vàng",
    deposit: 15000000,
    total: 78000000,
    status: "deposited",
    createdAt: "2026-02-10",
    note: "Tiệc ngoài trời, cần backup sảnh",
  },
  {
    key: 6,
    id: "TW-2024-006",
    groom: "Bùi Quốc Hùng",
    bride: "Cao Thị Linh",
    phone: "0956789012",
    date: "2026-03-28",
    hall: {
      id: 4,
      name: "Sảnh Hoàng Gia",
      capacity: 120,
      price: 18000000,
      description: "Phong cách châu Âu, dành cho tiệc cao cấp",
      image:
        "https://mgs-storage.sgp1.digitaloceanspaces.com/gala/2024/01/sanh-tiec-autumn-to-chuc-tiec-tan-nien-tai-trung-tam-to-chuc-hoi-nghi-tphcm-gala-center.jpeg",
    },
    tables: 50,
    menu: "Gói Kim Cương",
    deposit: 50000000,
    total: 140000000,
    status: "completed",
    createdAt: "2025-11-20",
    note: "",
  },
  {
    key: 7,
    id: "TW-2024-007",
    groom: "Đinh Văn Khoa",
    bride: "Trương Thị Yến",
    phone: "0967890123",
    date: "2026-07-05",
    hall: {
      id: 4,
      name: "Sảnh Hoàng Gia",
      capacity: 120,
      price: 18000000,
      description: "Phong cách châu Âu, dành cho tiệc cao cấp",
      image:
        "https://mgs-storage.sgp1.digitaloceanspaces.com/gala/2024/01/sanh-tiec-autumn-to-chuc-tiec-tan-nien-tai-trung-tam-to-chuc-hoi-nghi-tphcm-gala-center.jpeg",
    },
    tables: 28,
    menu: "Gói Bạch Kim",
    deposit: 0,
    total: 72000000,
    status: "pending",
    createdAt: "2026-02-15",
    note: "",
  },
  {
    key: 8,
    id: "TW-2024-008",
    groom: "Phan Minh Tuấn",
    bride: "Vũ Thị Hương",
    phone: "0978901234",
    date: "2026-04-10",
    hall: {
      id: 4,
      name: "Sảnh Hoàng Gia",
      capacity: 120,
      price: 18000000,
      description: "Phong cách châu Âu, dành cho tiệc cao cấp",
      image:
        "https://mgs-storage.sgp1.digitaloceanspaces.com/gala/2024/01/sanh-tiec-autumn-to-chuc-tiec-tan-nien-tai-trung-tam-to-chuc-hoi-nghi-tphcm-gala-center.jpeg",
    },
    tables: 22,
    menu: "Gói Vàng",
    deposit: 0,
    total: 55000000,
    status: "cancelled",
    createdAt: "2026-01-25",
    note: "Hủy do dịch",
  },
];

function StatCards({ data }) {
  const { t } = useTheme();
  const stats = [
    {
      label: "Tổng đặt tiệc",
      value: data.length,
      color: "#4f8ef7",
      icon: "📋",
      bg: "rgba(79,142,247,0.12)",
    },
    {
      label: "Chờ xác nhận",
      value: data.filter((d) => d.status === "pending").length,
      color: "#f97314",
      icon: "⏳",
      bg: "rgba(249,115,22,0.12)",
    },
    {
      label: "Đã cọc",
      value: data.filter((d) => d.status === "deposited").length,
      color: "#a855f7",
      icon: "💰",
      bg: "rgba(148,85,247,0.12)",
    },
    {
      label: "Hoàn thành",
      value: data.filter((d) => d.status === "completed").length,
      color: "#22d3a5",
      icon: "✅",
      bg: "rgba(34,211,145,0.12)",
    },
  ];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 14,
        marginBottom: 24,
      }}
    >
      {stats.map((s) => (
        <div
          key={s.label}
          style={{
            background: t.surface,
            border: `1px solid ${t.border}`,
            borderRadius: 12,
            padding: "18px 20px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            transition: "background .3s",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: s.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              flexShrink: 0,
            }}
          >
            {s.icon}
          </div>
          <div>
            <div
              style={{
                fontSize: 28,
                color: s.color,
                lineHeight: 1,
                fontFamily: "monospace",
              }}
            >
              {s.value}
            </div>
            <div style={{ fontSize: 14, color: t.textMuted, marginTop: 3 }}>
              {s.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function BookingPage() {
  const { t } = useTheme();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [actionModal, setActionModal] = useState({
    action: "create",
    dataUpdate: null,
  });
  // const [drawerRecord, setDrawerRecord] = useState(null);
  const [openEditStatusModal, setOpenEditStatusModal] = useState(null);
  // const [openDetailModal, setOpenDetailModal] = useState(false);
  const filtered = MOCK_BOOKINGS.filter((b) => {
    const matchSearch =
      b.groom.toLowerCase().includes(search.toLowerCase()) ||
      b.bride.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.phone.includes(search);
    const matchStatus = statusFilter === "all" || b.status === statusFilter;
    return matchSearch && matchStatus;
  });
  const fmt = (n) => new Intl.NumberFormat("vi-VN").format(n) + "đ";

  const columns = [
    {
      title: "Mã tiệc",
      dataIndex: "id",
      key: "id",
      width: 130,
      render: (v) => (
        <span
          style={{
            fontSize: 14,
            color: t.accent,
          }}
        >
          {v}
        </span>
      ),
    },
    {
      title: "Cặp đôi",
      key: "couple",
      render: (_, r) => (
        <div>
          <div style={{ color: t.text, fontSize: 14 }}>
            💍 {r.groom} & {r.bride}
          </div>
          <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>
            <PhoneOutlined style={{ marginRight: 4 }} />
            {r.phone}
          </div>
        </div>
      ),
    },
    {
      title: "Ngày tiệc",
      dataIndex: "date",
      key: "date",
      width: 110,
      render: (v) => (
        <span style={{ fontSize: 14, color: t.textDim }}>
          {dayjs(v).format("DD/MM/YYYY")}
        </span>
      ),
    },
    {
      title: "Sảnh / Bàn",
      key: "hall",
      width: 140,
      render: (_, r) => (
        <div>
          <div style={{ fontSize: 14, color: t.text }}>{r.hall.name}</div>
          <div style={{ fontSize: 12, color: t.textMuted }}>
            {r.tables} bàn · {r.menu}
          </div>
        </div>
      ),
    },
    {
      title: "Tổng giá trị",
      dataIndex: "total",
      key: "total",
      width: 130,
      render: (v) => (
        <span
          style={{
            fontSize: 14,
            color: t.text,
          }}
        >
          {fmt(v)}
        </span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 140,
      render: (s) => {
        const st = STATUS[s];
        return (
          <Tag
            color={st.antColor}
            style={{
              borderRadius: 20,
              fontSize: 14,
              display: "inline-flex",
              alignItems: "center",
              padding: "4px 12px",

              gap: 4,
            }}
          >
            {st.icon} {st.label}
          </Tag>
        );
      },
    },
    {
      title: "",
      key: "action",
      width: 100,
      render: (_, r) => (
        <Space size={6}>
          <Tooltip title="Xem chi tiết">
            <Button
              size="middle"
              style={{ color: "green", border: "1px solid green" }}
              icon={<EyeOutlined />}
              onClick={() => {
                navigate("detail/TW-2024-001");
              }}
            />
          </Tooltip>
          <Tooltip
            title="Chỉnh sửa"
            onClick={() => {
              setActionModal({ action: "edit", dataUpdate: r });
              setModalOpen(true);
            }}
          >
            <Button
              size="middle"
              style={{ color: "orange", border: "1px solid orange" }}
              icon={<EditOutlined />}
            />
          </Tooltip>
          <Tooltip
            title="Cập nhật trạng thái"
            onClick={() => {
              setOpenEditStatusModal(r);
            }}
          >
            <Button
              size="middle"
              style={{ color: "blue", border: "1px solid blue" }}
              icon={<SyncOutlined />}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div
      style={{ animation: "fadeUp .35s ease both", background: t.surface }}
      className="p-[2rem] rounded-lg min-h-screen"
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 600,
              color: t.text,
              lineHeight: 1,
            }}
          >
            Đặt tiệc
          </h2>
          <p style={{ margin: "6px 0 0", fontSize: 14, color: t.textMuted }}>
            Quản lý toàn bộ lịch đặt tiệc cưới
          </p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          style={{ fontWeight: 600 }}
          onClick={() => {
            setActionModal({ action: "create", dataUpdate: null });
            setModalOpen(true);
          }}
        >
          Tạo đặt tiệc
        </Button>
      </div>
      <StatCards data={MOCK_BOOKINGS} />

      <div
        style={{
          background: t.surface,
          border: `1px solid ${t.border}`,
          borderRadius: 12,
          padding: "14px 20px",
          marginBottom: 14,
          display: "flex",
          gap: 12,
          alignItems: "center",
          flexWrap: "wrap",
          transition: "background .3s",
        }}
      >
        <Input
          prefix={<SearchOutlined style={{ color: t.textMuted }} />}
          placeholder="Tìm theo tên, SĐT, mã tiệc..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 280, height: 40 }}
          allowClear
        />
        <Select
          value={statusFilter}
          onChange={setStatusFilter}
          style={{ width: 160, height: 40 }}
          options={[
            { value: "all", label: "Tất cả trạng thái" },
            ...Object.entries(STATUS).map(([k, v]) => ({
              value: k,
              label: v.label,
            })),
          ]}
        />
        <div style={{ marginLeft: "auto", fontSize: 14, color: t.textMuted }}>
          Hiển thị <strong style={{ color: t.text }}>{filtered.length}</strong>{" "}
          / {MOCK_BOOKINGS.length} đơn
        </div>
      </div>

      <div
        style={{
          background: t.surface,
          border: `1px solid ${t.border}`,
          borderRadius: 12,
          overflow: "hidden",
          transition: "background .3s",
        }}
      >
        <Table
          dataSource={filtered}
          columns={columns}
          pagination={{
            pageSize: 6,
            size: "small",
            style: { padding: "12px 20px" },
          }}
          size="middle"
          style={{ background: "transparent" }}
          rowHoverBg={t.tableRowHover}
          locale={{
            emptyText: (
              <div style={{ padding: 40, color: t.textMuted }}>
                Không tìm thấy đơn đặt tiệc nào
              </div>
            ),
          }}
        />
      </div>

      <ActionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        action={actionModal.action}
        dataEdit={actionModal.dataUpdate}
      />

      <EditStatusModal
        open={openEditStatusModal}
        onClose={() => setOpenEditStatusModal(null)}
        record={openEditStatusModal}
      />

      <style>{`@keyframes fadeUp { from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)} }`}</style>
    </div>
  );
}
