import { useState, useEffect } from "react";

/**
 * Custom Hook: useDebounce
 * Giúp debounce giá trị (ví dụ ô tìm kiếm) để giảm số lần tính toán/lọc
 */
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
