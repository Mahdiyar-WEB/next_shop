import Button from "components/common/Button";
import Image from "next/image";
import Link from "next/link";

type Props = {
  image: string;
  text: string;
  alt?: string;
  href?: string;
  badgeText?: string;
};

const WebsiteBanner = ({
  image,
  text,
  alt = "",
  href = "/categories/mobile",
  badgeText = "فروشگاه ویرا",
}: Props) => {
  return (
    <section className="relative aspect-[1000/380] sm:aspect-[1000/450] lg:aspect-[2032/428] w-full overflow-hidden rounded-2xl md:rounded-3xl border border-gray-100/80 shadow-sm">
      {/* Background Image - Clean and Crisp */}
      <Image
        src={image}
        unoptimized
        alt={alt || text}
        fill
        priority
        className="object-cover object-center"
        sizes="(max-width: 1200px) 100vw, 1200px"
      />

      {/* Text & Content Container - Fixed to the Left Safe Area */}
      <div className="absolute inset-y-0 left-0 flex w-[46%] sm:w-[44%] md:w-[42%] items-center p-1.5 sm:p-4 md:p-6 lg:p-8">
        <div className="relative flex h-full w-full flex-col justify-between rounded-xl sm:rounded-2xl border border-white/60 bg-white/30 p-2.5 sm:p-5 md:p-6 lg:p-8 backdrop-blur-[6px] shadow-sm">
          {/* Subtle Ambient Glow behind text inside the card */}
          <div className="pointer-events-none absolute left-0 top-0 h-32 w-32 rounded-full bg-primary-400/15 blur-2xl" />

          {/* Top / Badge Section - Hidden on Mobile */}
          <div className="relative z-10 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-600" />
            <span className="text-[11px] font-semibold text-gray-700 sm:text-xs md:text-sm">
              {badgeText}
            </span>
          </div>

          {/* Center / Title Section */}
          <div className="relative z-10 my-auto py-1 sm:py-2">
            <h2 className="text-[10px] font-extrabold leading-snug text-gray-950  text-justify sm:text-base md:text-xl lg:text-2xl line-clamp-2">
              {text}
            </h2>
          </div>

          {/* Bottom / CTA Button Section */}
          <div className="relative z-10 pt-0.5 sm:pt-1">
            <Link href={href}>
              <Button
                variant="outline"
                className="group border-primary-600/80 bg-white/80 px-2 py-1 text-[9px] font-bold text-primary-700 shadow-sm transition-all duration-300 hover:bg-primary-600 hover:text-white sm:px-3.5 sm:py-1.5 sm:text-xs md:px-5 md:py-2.5 md:text-sm"
              >
                <span className="flex items-center gap-1 sm:gap-1.5">
                  <span className="whitespace-nowrap">مشاهده محصولات</span>
                  <svg
                    className="h-2.5 w-2.5 transition-transform duration-300 group-hover:-translate-x-1 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 rtl:rotate-180 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebsiteBanner;