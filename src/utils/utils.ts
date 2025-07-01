export const formatTime = (time: number) =>
  new Date(time * 1000).toISOString().substring(time >= 3600 ? 11 : 14, 19);
