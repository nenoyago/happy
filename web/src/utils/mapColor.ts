export default function checkNightMode() {
  const hour = new Date().getUTCHours();
  let mapColor = 'light';
  if (hour >= 0 && hour < 6) {
    mapColor = 'dark';
  } else if (hour >= 6 && hour < 18) {
    mapColor = 'light';
  } else {
    mapColor = 'dark';
  }

  return mapColor;
}