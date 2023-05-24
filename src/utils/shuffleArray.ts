export const shuffleArray = <T>(list: readonly T[]): T[] => {
  const newList = [...list]
  for (let i = newList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newList[i], newList[j]] = [newList[j], newList[i]]
  }
  return newList
}
