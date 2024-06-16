export const isDev = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'development'
  }
  return 'production'
}
