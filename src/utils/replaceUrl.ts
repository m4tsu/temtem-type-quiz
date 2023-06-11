/**
 * Url を書き換える
 * next/navigation の router.push によるコンポーネントのstateのリセットをさせたくない場合に利用する想定
 * @param newUrl
 */
export const replaceUrl = (newUrl: string) => {
  window.history.replaceState(
    { ...window.history.state, as: newUrl, url: newUrl },
    '',
    newUrl
  )
}
