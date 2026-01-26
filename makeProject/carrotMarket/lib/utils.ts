export function toLocaleTimeStr(created_at:Date):string {
    return created_at.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // AM/PM 형식
    });
}
export function toLocaleDateStr(created_at:Date):string {
    return created_at.toLocaleDateString("en-US", {
        month: "short", // "Dec"
        day: "2-digit",  // "23"
        year: "numeric", // "2024"
    });
}