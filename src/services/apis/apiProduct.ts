import { CreateProductData, EditProductData } from "../../modules/product/type";
import supabase from "../supabase";

// 增
export const createProduct = async (createProduct: CreateProductData) => {
  const { data, error } = await supabase.from("products").insert([createProduct]).select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// 删
export const deleteProduct = async (id: number) => {
  const { data, error } = await supabase.from("products").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// 改
export const updateProduct = async ({ id, updateProduct }: { id: number; updateProduct: EditProductData }) => {
  const { data, error } = await supabase.from("products").update(updateProduct).eq("id", id).select().single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// 查
export const getProducts = async () => {
  const { data, error } = await supabase.from("products").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
