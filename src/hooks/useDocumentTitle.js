import { useEffect } from "react";

/**
 * Custom Hook: useDocumentTitle
 * Tự động cập nhật tiêu đề trang web trên từng Route
 */
export function useDocumentTitle(title, prefix = "TechZone • ") {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${prefix}${title}`;
    return () => {
      document.title = prevTitle;
    };
  }, [title, prefix]);
}
