import supabase from "../supabase";

// 获取用户
export const getUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    return null;
  }
  return user;
};

// 注册
export const signUp = async (data: { email: string; password: string }) => {
  const { email, password } = data;
  const { data: user, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return user;
};

// 邮箱验证
export const verifyOpt = async ({ email, token }: { email: string; token: string }) => {
  const { data, error } = await supabase.auth.verifyOtp({ email, token, type: "email" });
  if (error) throw new Error(error.message);
  return data;
};

// 登录
export const signIn = async (data: { email: string; password: string }) => {
  const { email, password } = data;
  const { data: user, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return user;
};

// 退出登录
export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};
