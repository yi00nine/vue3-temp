import { RouteRecordRaw } from 'vue-router'
import exception from './modules/exception'
import dashboard from './modules/dashboard'
import workFlow from './modules/workFlow'
import three from './modules/three'
export const appRoutes: RouteRecordRaw[] = [
  dashboard,
  exception,
  workFlow,
  three
]
