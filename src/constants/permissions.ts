export const PAGE = {
  PAGE1: 'page1',
  PAGE2: 'page2',
  PAGE3: 'page3',
  PAGE4: 'page4',
  PAGE5: 'page5',
} as const

export const ACTION = {
  VIEW: 'view',
  CREATE: 'create',
  EDIT: 'edit',
  DELETE: 'delete',
  APPROVE: 'approve',
} as const

export const PERM = {
  PAGE1_VIEW: `${PAGE.PAGE1}.${ACTION.VIEW}`,
  PAGE2_VIEW: `${PAGE.PAGE2}.${ACTION.VIEW}`,
  PAGE3_VIEW: `${PAGE.PAGE3}.${ACTION.VIEW}`,
  PAGE4_VIEW: `${PAGE.PAGE4}.${ACTION.VIEW}`,
} as const

export type Permission = (typeof PERM)[keyof typeof PERM]
