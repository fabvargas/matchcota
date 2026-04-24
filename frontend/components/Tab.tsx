export default function Tab({ active, onClick, icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition whitespace-nowrap
        ${
          active
            ? "border-[#4CAF7A] text-[#4CAF7A]"
            : "border-transparent text-muted-foreground hover:text-[#4CAF7A]"
        }
      `}
    >
      {icon}
      {label}
    </button>
  );
}