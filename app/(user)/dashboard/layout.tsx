"use client";

import UserDrawer from "components/user/UserDrawer";
import UserHeader from "components/user/UserHeader";
import { ReactNode, Suspense, useEffect, useState } from "react";

export default function UserLayout({ children }: { children: ReactNode }) {
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobileDrawer = () => {
    setMobileOpen(false);
  };

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div className="flex min-h-dvh bg-white text-secondary-900">
      {/* Mobile Overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="بستن منوی موبایل"
          className="fixed inset-0 z-40 bg-secondary-900/40 backdrop-blur-sm lg:hidden"
          onClick={closeMobileDrawer}
        />
      )}

      {/* Desktop Drawer */}
      <aside className="sticky top-0 hidden h-dvh shrink-0 self-start lg:block">
        <UserDrawer
          isOpen={desktopOpen}
          onClose={() => {}}
          onToggle={() => setDesktopOpen((prev) => !prev)}
        />
      </aside>

      {/* Mobile Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-dvh transition-transform duration-300 ease-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <UserDrawer
          isOpen={true}
          onToggle={closeMobileDrawer}
          onClose={closeMobileDrawer}
        />
      </div>

      {/* Main Area */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-secondary-200 bg-white/85 shadow-sm shadow-secondary-200/40 backdrop-blur-xl">
          <Suspense>
            <UserHeader onMobileToggle={() => setMobileOpen((prev) => !prev)} />
          </Suspense>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-screen-2xl">
            <Suspense>{children}</Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}
