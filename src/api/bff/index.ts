import BFF from './request'

export const getAppsRoutes = () => BFF.get('/nacos/findAll')
export const updateAppsRoutes = (data) => BFF.post('/nacos/update', data)
