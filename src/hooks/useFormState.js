import { useState, useEffect } from "react";

// ĐÃ THÊM EXPORT Ở ĐÂY ĐỂ CÁC FILE KHÁC CÓ THỂ NHÌN THẤY
export const globalFormMemory = {};

export const useFormState = (key, initialValue) => {
  // 1. Kiểm tra xem trong bộ nhớ tạm đã có dữ liệu của ô này chưa
  const [state, setState] = useState(() => {
    if (globalFormMemory[key] !== undefined) {
      return globalFormMemory[key];
    }
    return initialValue;
  });

  // 2. Tự động lưu lại vào bộ nhớ tạm mỗi khi người dùng gõ/chọn
  useEffect(() => {
    globalFormMemory[key] = state;
  }, [key, state]);

  // Trả về y chang cấu trúc của useState thông thường
  return [state, setState];
};