import { Radio, RadioChangeEvent } from "antd";
import { useState } from "react";
import SignInForm from "../modules/auth/SignInForm";
import SignUpForm from "../modules/auth/SignUpForm";
import SignUpVerifyForm from "../modules/auth/SignUpVerifyForm";

function Login() {
  const defaultValue = "signIn";
  const [currentTab, setCurrentTab] = useState(defaultValue);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState("");

  const handleTabChange = (e: RadioChangeEvent) => {
    setCurrentTab(e.target.value);
    setIsVerifying(false);
    setVerifyEmail("");
  };

  const goToSignUp = () => {
    setCurrentTab("signUp");
    setIsVerifying(false);
    setVerifyEmail("");
  };
  const goToVerify = (email: string) => {
    setIsVerifying(true);
    setVerifyEmail(email);
  };

  return (
    <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center gap-4">
      <Radio.Group defaultValue={defaultValue} buttonStyle="solid" value={currentTab} onChange={handleTabChange}>
        <Radio.Button value="signIn">Sign In</Radio.Button>
        <Radio.Button value="signUp">Sign Up</Radio.Button>
      </Radio.Group>
      {currentTab === "signIn" ? (
        <SignInForm />
      ) : isVerifying ? (
        <SignUpVerifyForm goToSignUp={goToSignUp} email={verifyEmail} />
      ) : (
        <SignUpForm goToVerify={goToVerify} />
      )}
    </div>
  );
}

export default Login;
