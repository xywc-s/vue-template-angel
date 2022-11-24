import request from './request'

/**
 * 查询部门及其上级部门
 * @param code 部门编号
 */
export const findDepartmentAndAllParent = (code: string) =>
  request.post('/department/findDepartmentAndAllParent', { code })
