"use client";

import { Avatar, AvatarImage } from "@/frontend/components/ui/avatar";

const avatars = [
  "/images/avatars/avatar1.png",
  "/images/avatars/avatar2.png",
  "/images/avatars/avatar3.png",
  "/images/avatars/avatar4.png",
  "/images/avatars/avatar5.png",
  "/images/avatars/avatar6.png",
];

export default function AvatarSelector({
  current,
  onSelect,
  onClose,
}: any) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">

      {/* fondo */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* contenido */}
      <div className="relative bg-white rounded-xl p-6 shadow-lg w-full max-w-md z-10">

        <h2 className="text-lg font-semibold mb-4 text-center">
          Selecciona tu avatar
        </h2>

        <div className="grid grid-cols-3 gap-4">
          {avatars.map((item) => (
            <button
              key={item}
              onClick={() => {
                onSelect(item);
                onClose();
              }}
              className={`p-1 rounded-full border-2 ${
                current === item
                  ? "border-primary"
                  : "border-transparent"
              }`}
            >
              <Avatar className="w-20 h-20">
                <AvatarImage src={item} />
              </Avatar>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}