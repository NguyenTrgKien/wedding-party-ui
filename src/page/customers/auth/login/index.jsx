import { useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
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
    background: #1a0e0e;
    overflow: hidden;
  }

  .wedding-bg::before {
    content: '';
    position: absolute;
    inset: 0;
    background: 
      radial-gradient(ellipse 80% 60% at 20% 80%, rgba(180, 120, 80, 0.18) 0%, transparent 60%),
      radial-gradient(ellipse 60% 80% at 80% 10%, rgba(212, 175, 140, 0.12) 0%, transparent 55%),
      radial-gradient(ellipse 100% 40% at 50% 50%, rgba(100, 60, 40, 0.25) 0%, transparent 70%);
  }

  .petal {
    position: absolute;
    pointer-events: none;
    opacity: 0;
    animation: floatPetal linear infinite;
  }

  .petal::before {
    content: '';
    display: block;
    width: 8px;
    height: 12px;
    background: radial-gradient(ellipse at 40% 30%, rgba(230, 180, 150, 0.6), rgba(180, 100, 80, 0.2));
    border-radius: 50% 0 50% 0;
    transform: rotate(var(--rot));
  }

  @keyframes floatPetal {
    0% { transform: translateY(-20px) translateX(0px); opacity: 0; }
    10% { opacity: 0.7; }
    90% { opacity: 0.4; }
    100% { transform: translateY(110vh) translateX(var(--drift)); opacity: 0; }
  }

  .auth-card {
    position: relative;
    background: rgba(255, 248, 242, 0.04);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(212, 175, 140, 0.2);
    border-radius: 2px;
    padding: 52px 48px 44px;
    width: 100%;
    max-width: 440px;
    box-shadow: 
      0 0 0 1px rgba(212, 175, 140, 0.06),
      0 32px 80px rgba(0, 0, 0, 0.6),
      inset 0 1px 0 rgba(255, 240, 220, 0.1);
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
    opacity: 0.4;
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
    animation: iconPulse 3s ease-in-out infinite;
  }

  @keyframes iconPulse {
    0%, 100% { box-shadow: 0 4px 24px rgba(180, 120, 80, 0.4), 0 0 0 8px rgba(180, 120, 80, 0.08); }
    50% { box-shadow: 0 4px 32px rgba(180, 120, 80, 0.6), 0 0 0 12px rgba(180, 120, 80, 0.04); }
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
    color: rgba(212, 175, 140, 0.6);
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
    background: linear-gradient(to right, transparent, rgba(212, 175, 140, 0.3), transparent);
  }

  .divider-ornament span {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px;
    color: rgba(212, 175, 140, 0.5);
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
    border-color: rgba(212, 175, 140, 0.5) !important;
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

  .wedding-form .ant-checkbox-wrapper {
    color: rgba(212, 175, 140, 0.6) !important;
    font-size: 12px !important;
  }

  .wedding-form .ant-checkbox-inner {
    background: transparent !important;
    border-color: rgba(212, 175, 140, 0.3) !important;
    border-radius: 2px !important;
  }

  .wedding-form .ant-checkbox-checked .ant-checkbox-inner {
    background: #c9956a !important;
    border-color: #c9956a !important;
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

  .wedding-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  .wedding-btn:hover::before {
    transform: translateX(100%);
  }

  .wedding-btn:hover {
    transform: translateY(-1px) !important;
    box-shadow: 0 8px 28px rgba(180, 112, 64, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
  }

  .wedding-btn:active {
    transform: translateY(0px) !important;
  }

  .hint-box {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(255, 240, 220, 0.06);
    border: 1px solid rgba(212, 175, 140, 0.15);
    border-radius: 2px;
    padding: 14px 18px;
    color: rgba(212, 175, 140, 0.5);
    font-size: 11px;
    letter-spacing: 0.05em;
    line-height: 1.8;
    backdrop-filter: blur(8px);
    animation: cardReveal 1s 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .hint-box div:first-child {
    color: rgba(212, 175, 140, 0.35);
    font-size: 9px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .forgot-link {
    color: rgba(212, 175, 140, 0.5) !important;
    font-size: 11px !important;
    letter-spacing: 0.06em !important;
    text-decoration: none !important;
    transition: color 0.2s !important;
    text-transform: uppercase !important;
  }

  .forgot-link:hover {
    color: #c9956a !important;
  }

  .register-link {
    color: rgba(212, 175, 140, 0.45);
    font-size: 12px;
    text-align: center;
    letter-spacing: 0.04em;
  }

  .register-link a {
    color: #c9956a !important;
    text-decoration: none !important;
    transition: color 0.2s !important;
    margin-left: 4px;
  }

  .register-link a:hover {
    color: #e8c4a0 !important;
  }

  .ant-form-item-explain-error {
    color: #e09070 !important;
    font-size: 11px !important;
  }
`;

function Login() {
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
      message.success("Đăng nhập thành công!");
    } else {
      message.error("Email hoặc mật khẩu không đúng.");
    }
  };

  const petals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${8 + i * 8}%`,
    delay: `${i * 1.4}s`,
    duration: `${10 + (i % 5) * 2}s`,
    drift: `${(i % 2 === 0 ? 1 : -1) * (20 + i * 5)}px`,
    rot: `${i * 30}deg`,
  }));

  return (
    <>
      <style>{styles}</style>
      <div className="wedding-auth-root wedding-bg" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        
        {petals.map((p) => (
          <div
            key={p.id}
            className="petal"
            style={{
              left: p.left,
              top: "-20px",
              animationDelay: p.delay,
              animationDuration: p.duration,
              "--drift": p.drift,
              "--rot": p.rot,
            }}
          />
        ))}

        <div className="hint-box">
          <div>Demo credentials</div>
          <div>admin@wedding.vn</div>
          <div>admin123</div>
        </div>

        <div className="auth-card">
          <div className="corner-ornament tl" />
          <div className="corner-ornament tr" />
          <div className="corner-ornament bl" />
          <div className="corner-ornament br" />

          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div className="brand-icon">💍</div>
            <h2 className="brand-title">WeddingKPVT</h2>
            <p className="brand-subtitle">Hệ thống quản trị tiệc cưới</p>
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

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <Form.Item name="remember" valuePropName="checked" style={{ margin: 0 }}>
                <Checkbox>Ghi nhớ đăng nhập</Checkbox>
              </Form.Item>
              <a href="#" className="forgot-link">Quên mật khẩu?</a>
            </div>

            <Form.Item style={{ margin: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                block
                className="wedding-btn"
              >
                Đăng nhập
              </Button>
            </Form.Item>

            <div className="register-link" style={{ marginTop: 20 }}>
              Bạn chưa có tài khoản?
              <a href="/register">Đăng ký</a>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;