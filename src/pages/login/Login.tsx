import { Button, Form, Input } from "antd";
import { useLogin } from "../../hooks/useAuth";

type FieldType = {
  email: string;
  password: string;
};

function Login() {
  const [form] = Form.useForm();
  const { login, isLoggingIn } = useLogin();

  const onFinish = (values: FieldType) => {
    login({ email: values.email, password: values.password });
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className="flex justify-center w-[100%] mt-8">
      <div className="p-4 bg-white rounded-xl pt-[36px]">
        <Form
          form={form}
          className="w-[600px]"
          name="basic"
          labelCol={{ span: 3 }}
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          initialValues={{ email: "sw@demo.com", password: "sw123456" }}
          autoComplete="off"
        >
          <Form.Item<FieldType> label="用户名" name="email" rules={[{ required: true, message: "请输入用户名!" }]}>
            <Input disabled={isLoggingIn} />
          </Form.Item>

          <Form.Item<FieldType> label="密码" name="password" rules={[{ required: true, message: "请输入密码!" }]}>
            <Input.Password disabled={isLoggingIn} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 3 }}>
            <Button type="primary" htmlType="submit" loading={isLoggingIn}>
              Submit
            </Button>
            <Button className="ml-3" htmlType="button" onClick={onReset} disabled={isLoggingIn}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
