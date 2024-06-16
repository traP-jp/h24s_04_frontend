export const dataURLToBlob = (url: string) => {
  // データURLのプレフィックスを削除して純粋なBase64文字列を取得
  const base64Data = url.split(',')[1]
  // Base64文字列をデコードしてバイナリデータに変換
  const byteCharacters = atob(base64Data)
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)
  // Blobオブジェクトを作成
  const blob = new Blob([byteArray], { type: 'image/png' })
  return blob
}
