import { auditApi } from '@/api/audit-api'
import type { AuditLog } from '@/models/audit'

type AuditLogParams = Omit<AuditLog, 'device'>

export const auditService = {
  log(params: AuditLogParams) {
    auditApi
      .log({
        ...params,
        device: navigator.userAgent,
      })
      .catch(console.error)
  },
}
