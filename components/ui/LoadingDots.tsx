
export default function LoadingDots() {
  return (
    <svg
      width="56"
      height="24"
      viewBox="0 0 56 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Loading"
      role="status"
    >
      <circle
        cx="8"
        cy="12"
        r="5"
        fill="#BFDBFE"
        className="animate-bounce-dot"
        style={{ animationDelay: "0ms" }}
      />

      <circle
        cx="28"
        cy="12"
        r="5"
        fill="#60A5FA"
        className="animate-bounce-dot"
        style={{ animationDelay: "150ms" }}
      />

      <circle
        cx="48"
        cy="12"
        r="5"
        fill="#2563EB"
        className="animate-bounce-dot"
        style={{ animationDelay: "300ms" }}
      />
    </svg>
  );
}
