import { TabBar } from "@/components";

export const metadata = {
  title: "Cookies Page",
};

export default function CookiesPage() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      <div className="flex flex-col">
        <span className="text-3xl">Tabs</span>

        <TabBar tabs={[1, 2, 3, 4]} />
      </div>
    </div>
  );
}
