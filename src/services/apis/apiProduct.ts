import { CreateProductData, EditProductData } from "../../modules/product/type";
import supabase, { supabaseUrl } from "../supabase";

// 上传文件
const updateFile = async (fileData: File) => {
  if (!fileData || !(fileData instanceof File)) {
    return "";
  }
  // 获取文件名
  const file_path = `${Math.random()}-${fileData.name}`.replaceAll("/", "").replaceAll("%", "");
  // 上传文件
  const { data, error } = await supabase.storage.from("products").upload(file_path, fileData);
  // 处理失败
  if (error) {
    throw new Error(error.message);
  }
  if (data.fullPath) {
    return `${supabaseUrl}/storage/v1/object/public/${data.fullPath}`;
  }
  return "";
};

// 增
export const createProduct = async (createProduct: CreateProductData) => {
  // 第一步先判断是否有文件，如果有先上传文件得到文件地址
  if (createProduct.pictureFile) {
    const pictureUrl = await updateFile(createProduct.pictureFile);
    createProduct.pictureUrl = pictureUrl;
  }
  delete createProduct.pictureFile;
  // 第二步将数据插入数据库
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
  // 第一步先判断是否有文件，如果有先上传文件得到文件地址
  if (updateProduct.pictureFile) {
    const pictureUrl = await updateFile(updateProduct.pictureFile);
    updateProduct.pictureUrl = pictureUrl;
  }
  delete updateProduct.pictureFile;
  // 第二步将数据插入数据库
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
