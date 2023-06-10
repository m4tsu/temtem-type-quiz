export const katakanaToHiragana = (katakana: string) => {
  return katakana.replace(/[\u30a1-\u30f6]/g, (match) => {
    const chr = match.charCodeAt(0) - 0x60
    return String.fromCharCode(chr)
  })
}

export const hiraganaToKatakana = (hiragana: string) => {
  return hiragana.replace(/[\u3041-\u3096]/g, (match) => {
    const chr = match.charCodeAt(0) + 0x60
    return String.fromCharCode(chr)
  })
}
