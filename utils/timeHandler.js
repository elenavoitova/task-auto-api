export default function checkDateTime(timeStr) {
  const now = Date.now();
  const check = Date.parse(timeStr);

  if(now - check < 500) return true;

  return false
}