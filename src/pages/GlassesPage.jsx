import TryGlasses from "../glasses";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function GlassesPage() {
  useDocumentTitle("Phòng Thử Kính Online");
  return <TryGlasses />;
}
