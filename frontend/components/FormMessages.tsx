import React from "react";

type Props = {
  message: string | string[];
  error: boolean;
};

export default function FormMessages({ message, error }: Props) {
  if (!message) return null;

  const messages = Array.isArray(message)
    ? message
    : message.split(",").map((msg) => msg.trim());

  return (
    <ul
      className={`mt-2 text-sm list-disc pl-5 ${
        error ? "text-red-500" : "text-green-500"
      }`}
    >
      {messages.map((msg, index) => (
        <li key={index}>{msg}</li>
      ))}
    </ul>
  );
}