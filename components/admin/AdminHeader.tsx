export default function AdminHeader() {
  return (
    <header className="fixed w-full top-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[76px] items-center justify-between px-6 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center">
            <img
              src="/images/logo.png"
              alt="Pride Logo"
              width={100}
              height={100}
              className="h-auto w-[62px] sm:w-[72px] lg:w-[80px]"
            />
          </div>

          <div>
            <p className="text-[11px] font-[700] uppercase tracking-[0.14em] text-black/45">
              Pride Group
            </p>
            <h1 className="text-[18px] font-[600] text-black">
              Admin Dashboard
            </h1>
          </div>
        </div>

        <form action="/api/admin/logout" method="POST">
          <button
            type="submit"
            className="cursor-pointer rounded-full bg-[#172f55] px-5 py-2.5 text-[12px] font-[700] uppercase tracking-[0.08em] text-white transition hover:opacity-90"
          >
            Logout
          </button>
        </form>
      </div>
    </header>
  );
}
