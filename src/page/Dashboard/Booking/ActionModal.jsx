import { Form } from "antd";
import { useTheme } from "../../../context/themeContext";
import {
  Button,
  Input,
  Select,
  Modal,
  DatePicker,
  InputNumber,
  ConfigProvider,
} from "antd";
import { PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useMemo, useState } from "react";
// import axiosInstance from "../../../config/axiosInstance";
import { toast } from "react-toastify";
import SelectHallModal from "./SelectHallModal";
import dayjs from "dayjs";

function ActionModal({ open, onClose, action, dataEdit }) {
  const { t } = useTheme();
  const [form] = Form.useForm();
  const [selectHall, setSelectHall] = useState(null);
  const [openHallModal, setOpenHallModal] = useState(false);

  const handleClose = () => {
    form.resetFields();
    setSelectHall(null);
    onClose();
  };

  const themeConfig = useMemo(
    () => ({
      token: { controlHeight: 50 },
    }),
    [],
  );

  useEffect(() => {
    if (action === "edit" && dataEdit) {
      form.setFieldsValue({
        hall: dataEdit.hall,
        groom: dataEdit.groom,
        bride: dataEdit.bride,
        phone: dataEdit.phone,
        date: dataEdit.date ? dayjs(dataEdit.date) : null,
        tables: dataEdit.tables,
        note: dataEdit.note,
        menu: dataEdit.menu,
      });
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectHall(dataEdit.hall);
    }
  }, [open, dataEdit, action, form]);

  const handleSubmit = async (value) => {
    console.log(value);
    // const date = new Date(value.date).toISOString();

    // const payload = {
    //   ...value,
    //   date: date,
    // };
    // try {
    //   const res = await axiosInstance.post("/api/v1/orders", payload);
    //   if (res.response.status === 201) {
    //     toast.success("Tạo đơn hàng thành công!");
    //     form.resetFields();
    //   }
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   onClose();
    // }
    toast.success(
      action === "create" ? "Tạo đơn hàng thành công!" : "Đã lưu thay đổi!",
    );
    onClose();
  };

  const handleSelectHall = (hall) => {
    setSelectHall(hall);
    form.setFieldsValue({
      hall: hall.id,
    });
    setOpenHallModal(false);
  };

  return (
    <ConfigProvider theme={themeConfig}>
      <Modal
        centered
        title={
          <span
            style={{
              color: t.text,
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            {action === "create" ? "Tạo đặt tiệc mới" : "Chỉnh sửa"}
          </span>
        }
        open={open}
        onCancel={handleClose}
        destroyOnHidden
        footer={null}
        width={600}
        className="booking-modal"
      >
        <Form
          form={form}
          size="small"
          layout="vertical"
          style={{ marginTop: 18 }}
        >
          <div className="grid grid-cols-2 gap-x-[1.5rem]">
            <Form.Item
              label={<span style={{ color: t.textDim }}>Chú rể</span>}
              name="groom"
              rules={[{ required: true }]}
            >
              <Input
                prefix={<UserOutlined style={{ color: t.textMuted }} />}
                placeholder="Họ tên chú rể"
              />
            </Form.Item>
            <Form.Item
              label={<span style={{ color: t.textDim }}>Cô dâu</span>}
              name="bride"
              rules={[{ required: true }]}
            >
              <Input
                prefix={<UserOutlined style={{ color: t.textMuted }} />}
                placeholder="Họ tên cô dâu"
              />
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-x-[1.5rem]">
            <Form.Item
              label={<span style={{ color: t.textDim }}>Số điện thoại</span>}
              name="phone"
              rules={[{ required: true }]}
            >
              <Input
                prefix={<PhoneOutlined style={{ color: t.textMuted }} />}
                placeholder="0901..."
              />
            </Form.Item>
            <Form.Item
              label={<span style={{ color: t.textDim }}>Ngày tiệc</span>}
              name="date"
              rules={[{ required: true }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
                placeholder="Chọn ngày"
              />
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-x-[1.5rem]">
            <Form.Item
              name="hall"
              rules={[{ required: true, message: "Vui lòng chọn sảnh" }]}
              hidden
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={<span style={{ color: t.textDim }}>Sảnh</span>}
              required
            >
              <Input
                readOnly
                value={selectHall?.name}
                placeholder="Chọn sảnh"
                onClick={() => setOpenHallModal(true)}
                style={{ cursor: "pointer" }}
              />
            </Form.Item>
            <Form.Item
              label={<span style={{ color: t.textDim }}>Số bàn</span>}
              name="tables"
              rules={[{ required: true }]}
            >
              <InputNumber
                min={1}
                max={100}
                style={{ width: "100%", display: "block" }}
                placeholder="30"
              />
            </Form.Item>
          </div>
          <Form.Item
            label={<span style={{ color: t.textDim }}>Gói thực đơn</span>}
            name="menu"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Chọn gói"
              style={{}}
              options={[
                { value: "silver", label: "Gói Bạc — 1,200,000đ/bàn" },
                { value: "gold", label: "Gói Vàng — 1,800,000đ/bàn" },
                { value: "platinum", label: "Gói Bạch Kim — 2,500,000đ/bàn" },
                { value: "diamond", label: "Gói Kim Cương — 3,500,000đ/bàn" },
              ]}
            />
          </Form.Item>
          <Form.Item
            label={<span style={{ color: t.textDim }}>Ghi chú</span>}
            name="note"
          >
            <Input.TextArea rows={2} placeholder="Yêu cầu đặc biệt..." />
          </Form.Item>
          <div
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "flex-end",
              marginTop: 20,
            }}
          >
            <Button
              size="small"
              onClick={handleClose}
              style={{ padding: "0 20px" }}
            >
              Hủy
            </Button>
            <Button
              type="primary"
              style={{ padding: "0 20px" }}
              onClick={() => {
                form.validateFields().then((value) => {
                  handleSubmit(value);
                });
              }}
            >
              {action === "create" ? "Tạo đặt tiệc" : "Lưu thay đổi"}
            </Button>
          </div>
        </Form>
      </Modal>

      <SelectHallModal
        openHallModal={openHallModal}
        onClose={() => setOpenHallModal(false)}
        selectedHall={selectHall}
        setSelectHall={handleSelectHall}
      />
    </ConfigProvider>
  );
}

export default ActionModal;
