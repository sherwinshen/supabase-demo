import { CreateProductData, EditProductData } from "../../modules/product/type";
import supabase from "../supabase";

// 增
export const createProduct = async (createProduct: CreateProductData) => {
  const { data, error } = await supabase.from("products").insert([createProduct]).select().single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// 删
export const deleteProduct = async (id: number) => {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
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
export const getProducts = async ({
  sortby,
  filters,
}: {
  sortby?: { field: string; ascending: boolean };
  filters?: { field: string; method: string; value: string | number }[];
}) => {
  let query = supabase.from("products").select("*");
  // 排序
  if (sortby) {
    query = query.order(sortby.field, { ascending: sortby.ascending });
  }
  // 过滤
  if (filters && filters.length > 0) {
    filters.forEach((filter) => {
      query = query?.[filter.method]?.(filter.field, filter.value);
    });
  }
  const { data, error } = await query;
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
