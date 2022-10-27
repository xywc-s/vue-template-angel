import request from './request'

export class BFF {
  /**
   * 获取所有应用配置
   */
  static getAppsRoutes = () => request.get('/nacos/findAll')

  /**
   * 更新应用配置
   */
  static updateAppsRoutes = (data) => request.post('/nacos/update', data)
}
