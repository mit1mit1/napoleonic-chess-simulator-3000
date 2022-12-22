export const generateSassyFrenchMessage = (prompt: string) => {
  const random = Math.random();
  if (prompt === "win") {
    return "Bien joué, vous avez battu un morceau de silicium conçu par un simplet";
  }
  if (prompt === "loss") {
    if (random < 0.5) {
      return "Kindergarten homme?"
    }
    return "Dommage, si triste";
  }
  if (prompt === "tie") {
    return "On dirait que quelqu'un a manqué de temps et/ou de pièces";
  }
  return "Yo, wassup?"
};
