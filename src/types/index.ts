// 请求得到的用户信息
export type UserData = {
  id: number;
  name: string;
  age: number;
  address?: string;
  avatarUrl?: string;
};

// 创建用户时提交的数据
export type CreateUserData = {
  name: string;
  age: number;
  address?: string;
  avatarUrl?: string;
  avatarFile?: File;
};

// 修改用户信息时提交的数据
export type EditUserData = {
  id: number;
  name: string;
  age: number;
  address?: string;
  avatarUrl?: string;
  avatarFile?: File;
};
