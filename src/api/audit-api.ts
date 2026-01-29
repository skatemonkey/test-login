import { auditClient } from '@/api'
import type { AuditLog } from '@/models/audit'

export const auditApi = {
  log: (data: AuditLog) => auditClient.post('/log', data),
}
