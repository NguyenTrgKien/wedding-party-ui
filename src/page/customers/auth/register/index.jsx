import { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  .wedding-auth-root {
    font-family: 'DM Sans', sans-serif;
  }

  .wedding-bg {
    position: fixed;
    inset: 0;
    background: #120c0c;
    overflow: hidden;
  }

  .wedding-bg::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(ellipse 70% 70% at 75% 20%, rgba(160, 100, 60, 0.15) 0%, transparent 60%),
      radial-gradient(ellipse 80% 50% at 15% 90%, rgba(200, 150, 110, 0.12) 0%, transparent 55%),
      radial-gradient(ellipse 60% 60% at 50% 50%, rgba(80, 40, 20, 0.3) 0%, transparent 70%);
  }

  .ring-orbit {
    position: absolute;
    border-radius: 50%;
    border: 1px solid rgba(212, 175, 140, 0.06);
    pointer-events: none;
    animation: rotateOrbit linear infinite;
  }

  @keyframes rotateOrbit {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }

  .auth-card {
    position: relative;
    background: rgba(255, 248, 242, 0.04);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(212, 175, 140, 0.18);
    border-radius: 2px;
    padding: 52px 48px 44px;
    width: 100%;
    max-width: 440px;
    box-shadow: 
      0 0 0 1px rgba(212, 175, 140, 0.05),
      0 32px 80px rgba(0, 0, 0, 0.65),
      inset 0 1px 0 rgba(255, 240, 220, 0.08);
    animation: cardReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes cardReveal {
    from { opacity: 0; transform: translateY(24px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }

  .corner-ornament {
    position: absolute;
    width: 32px;
    height: 32px;
    opacity: 0.35;
  }
  .corner-ornament.tl { top: 12px; left: 12px; border-top: 1px solid #d4af8c; border-left: 1px solid #d4af8c; }
  .corner-ornament.tr { top: 12px; right: 12px; border-top: 1px solid #d4af8c; border-right: 1px solid #d4af8c; }
  .corner-ornament.bl { bottom: 12px; left: 12px; border-bottom: 1px solid #d4af8c; border-left: 1px solid #d4af8c; }
  .corner-ornament.br { bottom: 12px; right: 12px; border-bottom: 1px solid #d4af8c; border-right: 1px solid #d4af8c; }

  .brand-icon {
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, #c9956a 0%, #e8c4a0 50%, #c9956a 100%);
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    margin-bottom: 20px;
    box-shadow: 0 4px 24px rgba(180, 120, 80, 0.4), 0 0 0 8px rgba(180, 120, 80, 0.08);
  }

  .brand-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 600;
    color: #f5e6d8;
    margin: 0;
    letter-spacing: 0.04em;
  }

  .brand-subtitle {
    font-size: 12px;
    color: rgba(212, 175, 140, 0.55);
    margin: 8px 0 0;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .divider-ornament {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 28px 0;
  }

  .divider-ornament::before,
  .divider-ornament::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(212, 175, 140, 0.25), transparent);
  }

  .divider-ornament span {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    color: rgba(212, 175, 140, 0.45);
    letter-spacing: 4px;
  }

  .wedding-form .ant-form-item-label > label {
    color: rgba(212, 175, 140, 0.8) !important;
    font-size: 11px !important;
    letter-spacing: 0.1em !important;
    text-transform: uppercase !important;
    font-weight: 400 !important;
    font-family: 'DM Sans', sans-serif !important;
  }

  .wedding-form .ant-input-affix-wrapper {
    background: rgba(255, 240, 220, 0.04) !important;
    border: 1px solid rgba(212, 175, 140, 0.2) !important;
    border-radius: 2px !important;
    transition: all 0.3s ease !important;
    height: 48px !important;
  }

  .wedding-form .ant-input-affix-wrapper:hover {
    border-color: rgba(212, 175, 140, 0.45) !important;
    background: rgba(255, 240, 220, 0.06) !important;
  }

  .wedding-form .ant-input-affix-wrapper-focused,
  .wedding-form .ant-input-affix-wrapper:focus-within {
    border-color: #c9956a !important;
    background: rgba(255, 240, 220, 0.06) !important;
    box-shadow: 0 0 0 3px rgba(180, 120, 80, 0.12) !important;
  }

  .wedding-form .ant-input {
    background: transparent !important;
    color: #f5e6d8 !important;
    font-family: 'DM Sans', sans-serif !important;
    font-size: 14px !important;
  }

  .wedding-form .ant-input::placeholder {
    color: rgba(212, 175, 140, 0.3) !important;
  }

  .wedding-form .ant-input-prefix {
    color: rgba(212, 175, 140, 0.4) !important;
    margin-right: 10px !important;
  }

  .wedding-form .ant-input-password-icon {
    color: rgba(212, 175, 140, 0.4) !important;
  }

  .wedding-form .ant-input-password-icon:hover {
    color: rgba(212, 175, 140, 0.8) !important;
  }

  .wedding-btn {
    background: linear-gradient(135deg, #b87040 0%, #d4a070 40%, #c9956a 60%, #a06030 100%) !important;
    border: none !important;
    border-radius: 2px !important;
    height: 50px !important;
    font-family: 'Cormorant Garamond', serif !important;
    font-size: 16px !important;
    font-weight: 600 !important;
    letter-spacing: 0.15em !important;
    color: #fff !important;
    text-transform: uppercase !important;
    box-shadow: 0 4px 20px rgba(180, 112, 64, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
    transition: all 0.3s ease !important;
    position: relative !important;
    overflow: hidden !important;
  }

  .wedding-btn:hover {
    transform: translateY(-1px) !important;
    box-shadow: 0 8px 28px rgba(180, 112, 64, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
  }

  .wedding-btn:active {
    transform: translateY(0px) !important;
  }

  .login-link {
    color: rgba(212, 175, 140, 0.45);
    font-size: 12px;
    text-align: center;
    letter-spacing: 0.04em;
  }

  .login-link a {
    color: #c9956a !important;
    text-decoration: none !important;
    transition: color 0.2s !important;
    margin-left: 4px;
  }

  .login-link a:hover {
    color: #e8c4a0 !important;
  }

  .ant-form-item-explain-error {
    color: #e09070 !important;
    font-size: 11px !important;
  }

  .register-badge {
    position: absolute;
    top: -1px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #b87040, #d4a070);
    color: #fff;
    font-size: 9px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 4px 16px;
    font-family: 'DM Sans', sans-serif;
  }
`;

function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    if (values.email === "admin@wedding.vn" && values.password === "admin123") {
      localStorage.setItem("user", JSON.stringify({ email: values.email }));
      navigate("/dashboard");
      message.success("Đăng ký thành công!");
    } else {
      message.error("Email hoặc mật khẩu không đúng.");
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div
        className="wedding-auth-root wedding-bg"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}
      >
        {[200, 320, 460].map((size, i) => (
          <div
            key={i}
            className="ring-orbit"
            style={{
              width: size,
              height: size,
              left: "12%",
              top: "15%",
              animationDuration: `${30 + i * 15}s`,
              animationDirection: i % 2 === 0 ? "normal" : "reverse",
            }}
          />
        ))}

        <div className="auth-card">
          <div className="register-badge">Tạo tài khoản mới</div>
          <div className="corner-ornament tl" />
          <div className="corner-ornament tr" />
          <div className="corner-ornament bl" />
          <div className="corner-ornament br" />

          <div style={{ textAlign: "center", marginBottom: 8, marginTop: 8 }}>
            <div className="brand-icon">💍</div>
            <h2 className="brand-title">WeddingKPVT</h2>
            <p className="brand-subtitle">Đăng ký tài khoản</p>
          </div>

          <div className="divider-ornament">
            <span>✦</span>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            requiredMark={false}
            className="wedding-form"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email" },
                { type: "email", message: "Email không hợp lệ" },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="admin@wedding.vn"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Nhập mật khẩu"
                size="large"
              />
            </Form.Item>

            <Form.Item style={{ margin: "8px 0 0" }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                block
                className="wedding-btn"
              >
                Đăng ký
              </Button>
            </Form.Item>

            <div className="login-link" style={{ marginTop: 20 }}>
              Bạn đã có tài khoản?
              <a href="/login">Đăng nhập</a>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Register;