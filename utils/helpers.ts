export const trimAddress = (string: string) => {
  return string.slice(0, 4) + "..." + string.slice(string.length - 4);
};
