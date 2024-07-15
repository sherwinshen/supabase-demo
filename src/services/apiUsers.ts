import { CreateUserData, EditUserData } from "../types";
import supabase, { supabaseUrl } from "./supabase";

// 上传头像文件
const updateFile = async (fileData: File) => {
  if (!fileData || !(fileData instanceof File)) {
    return "";
  }
  // 获取文件名
  const file_path = `${Math.random()}-${fileData.name}`.replaceAll("/", "").replaceAll("%", "");
  // 上传文件
  const { data, error } = await supabase.storage.from("avatars").upload(file_path, fileData);
  // 处理失败
  if (error) {
    throw new Error("Avatar image could not be uploaded");
  }
  if (data.fullPath) {
    return `${supabaseUrl}/storage/v1/object/public/${data.fullPath}`;
  }
  return "";
};

// 增
export const createUser = async (userData: CreateUserData) => {
  let avatarUrl = "";
  if (userData.avatarFile) {
    avatarUrl = await updateFile(userData.avatarFile);
  }
  userData.avatarUrl = avatarUrl;
  delete userData.avatarFile;
  const { data, error } = await supabase.from("users_demo").insert([userData]).select();
  if (error) {
    throw new Error("Users could not be created");
  }
  return { data };
};

// 删
export const deleteUser = async (id: number) => {
  const { data, error } = await supabase.from("users_demo").delete().eq("id", id);
  if (error) {
    throw new Error("Users could not be deleted");
  }
  return { data };
};

// 改
export const updateUser = async ({ id, updateData }: { id: number; updateData: EditUserData }) => {
  let avatarUrl = "";
  if (updateData.avatarFile) {
    avatarUrl = await updateFile(updateData.avatarFile);
  }
  updateData.avatarUrl = avatarUrl;
  delete updateData.avatarFile;
  const { data, error } = await supabase.from("users_demo").update(updateData).eq("id", id).select().single();
  if (error) {
    throw new Error("Users could not be updated");
  }
  return { data };
};

// 查
export const getUsers = async () => {
  const query = supabase
    .from("users_demo")
    .select("*")
    // 根据 id 排序
    .order("id", { ascending: false });
  const { data, error } = await query;
  if (error) {
    throw new Error("Users could not be fetched");
  }
  return { data };
};
