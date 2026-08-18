# Front-end data layer

- **React Query** مالک دادهٔ سرور است: محصولات، پست‌ها، دسته‌بندی‌ها، کاربران، نظرها، سبد خرید و session.
- **Zustand** تنها مالک state رابط کاربری است. نمونهٔ اولیهٔ آن `stores/ui-store.ts` است؛ دادهٔ API نباید در آن تکرار شود.
- `providers/query-provider.tsx` در root layout قرار دارد و یک `QueryClient` پایدار می‌سازد.
- hookهای موجود در `hooks/` با مسیرهای API جدید کار می‌کنند. پس از mutation، کلیدهای مربوط invalidate می‌شوند تا cache تازه شود.

## Cache Components / PPR

`cacheComponents: true` در `next.config.ts` فعال است. پوسته‌های عمومی و کامپوننت‌های بدون دادهٔ کاربر می‌توانند static شوند؛ بخش‌های session و داشبورد باید client-side با React Query یا server-side داخل `Suspense` باقی بمانند.

وقتی صفحهٔ عمومی محصول یا وبلاگ ساخته شد، فقط queryهای مستقل از cookie را با `'use cache'` و `cacheTag('products')`/`cacheTag('posts')` cache کنید. داخل تابع cache شده به `cookies()` یا `headers()` دسترسی ندهید.
