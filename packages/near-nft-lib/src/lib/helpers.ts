export const numArrToString = (nums: number[]) => {
  const textDecoder = new TextDecoder('utf-8')
  return textDecoder.decode(new Uint8Array(nums))
}
