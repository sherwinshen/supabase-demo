import supabase from "../supabase";

// 增(mock数据)
export const createOrders = async () => {
  const { data: products, error: productsError } = await supabase.from("products").select("*");
  if (productsError) {
    throw new Error(productsError.message);
  }
  // 随机生成0到products数量之间的一个数

  const count = 2;
  // 随机生成count条记录
  const orders = Array.from({ length: count }, () => {
    const randomNum = Math.floor(Math.random() * products.length);
    const randomProductNum = Math.floor(Math.random() * 100);
    return {
      productId: products[randomNum].id,
      productNum: randomProductNum,
      totalPrice: products[randomNum].price * randomProductNum,
    };
  });
  const { data, error } = await supabase.from("orders").insert(orders).select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// 删
export const deleteOrder = async (id: number) => {
  const { data, error } = await supabase.from("orders").delete().eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// 查
export const getOrders = async () => {
  const { data, error } = await supabase.from("orders").select("*, products(*)");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
