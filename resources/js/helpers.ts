import React from "react";

// simple helper
function isToday(date: Date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function isYesterday(date: Date) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
}

export default function formatMessageDateLong(date: string | Date) {
  const now = new Date();
  const inputDate = new Date(date);

  if (isToday(inputDate)) {
    return inputDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (isYesterday(inputDate)) {
    return (
      "Yesterday " +
      inputDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  }

  if (inputDate.getFullYear() === now.getFullYear()) {
    return inputDate.toLocaleDateString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // different year
  return inputDate.toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
export function formatMessageDateShort(date: string | Date) {
  const now = new Date();
  const inputDate = new Date(date);

  if (isToday(inputDate)) {
    return inputDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  if (isYesterday(inputDate)) {
    return "Yesterday";
  }

  if (inputDate.getFullYear() === now.getFullYear()) {
    return inputDate.toLocaleDateString([], {
      month: "short",
      day: "numeric",
    });
  }

  return inputDate.toLocaleDateString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
