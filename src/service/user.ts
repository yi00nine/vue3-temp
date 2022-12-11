import service from './http/index'
export const loginReq = (params:any) => service.post('/api/login',params) 



