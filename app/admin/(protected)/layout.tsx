import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminFooter from "@/components/admin/AdminFooter";
import { AdminNavigationProvider } from "@/components/admin/AdminNavigationProvider";
import AdminTopProgressBar from "@/components/admin/AdminTopProgressBar";

export default async function AdminProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const isAuthenticated = await isAdminAuthenticated();

  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  return (
    <AdminNavigationProvider>
      <div data-lenis-prevent className="min-h-screen bg-[#f7f8fa] text-black">
        <AdminTopProgressBar />
        <AdminHeader />

        <div className="flex items-start">
          <AdminSidebar />
          <main className="min-w-0 mt-[5%] flex-1 px-6 py-8">{children}</main>
        </div>

        <AdminFooter />
      </div>
    </AdminNavigationProvider>
  );
}
