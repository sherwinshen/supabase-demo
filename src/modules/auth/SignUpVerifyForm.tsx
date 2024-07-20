import { Form, Input, Button } from "antd";
import { useVerifyOpt } from "../../hooks/useAuth";

type FieldType = {
  email: string;
  token: string;
};

function SignUpVerifyForm({ goToSignUp, email }: { goToSignUp: () => void; email: string }) {
  const { isVerifying, handleVerifyOpt } = useVerifyOpt();
  const onFinish = (values: FieldType) => {
    handleVerifyOpt(
      {
        email,
        token: values.token,
      },
      {
        onSuccess: () => {
          goToSignUp();
        },
      }
    );
  };

  return (
    <Form onFinish={onFinish} disabled={isVerifying} labelAlign="left">
      <Form.Item<FieldType>
        label="Verify Code"
        name="token"
        rules={[{ required: true, message: "Please input verify code!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Verify
        </Button>
      </Form.Item>
    </Form>
  );
}

export default SignUpVerifyForm;
