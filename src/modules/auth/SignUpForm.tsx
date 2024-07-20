import { Form, Input, Button } from "antd";
import { useSignUp } from "../../hooks/useAuth";

type FieldType = {
  email: string;
  password: string;
};

function SignUpForm({ goToVerify }: { goToVerify: (email: string) => void }) {
  const [form] = Form.useForm();

  const { isSigningUp, handleSignUp } = useSignUp();

  const onFinish = (values: FieldType) => {
    handleSignUp(values, {
      onSuccess: () => {
        goToVerify(values.email);
      },
    });
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form form={form} onFinish={onFinish} disabled={isSigningUp} labelCol={{ span: 8 }} labelAlign="left">
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <div className="flex items-center gap-4">
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}

export default SignUpForm;
