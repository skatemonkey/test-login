export interface AuditLog {
  userId: number | 0
  module: string
  action: string
  device: string
  details?: string | Record<string, unknown>
}
