export const isDev = () => {
  console.log(process.env.NODE_ENV)
  return false
  if (process.env.NODE_ENV === 'development') {
    return true
  }
  return false
}
