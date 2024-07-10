import { CreateUserData, EditUserData } from "../types";
import supabase from "./supabase";

// 增
export const createUser = async (userData: CreateUserData) => {
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
