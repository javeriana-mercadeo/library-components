declare module '@vercel/ncc' {
  const compile: (input: string, options?: any) => Promise<{ code: string }>
  export default compile
}
