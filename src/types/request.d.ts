export interface AngelRes<D = unknown, T = unknown> {
  success: boolean
  message: string | null
  rows: D[]
  object: T
  total: number
  code: number
  footer: any[]
}
