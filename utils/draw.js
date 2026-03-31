export const generateDraw = () => {
  return Array.from({ length: 5 }, () =>
    Math.floor(Math.random() * 45) + 1
  );
};