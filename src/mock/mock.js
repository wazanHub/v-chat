import Mock from 'mockjs'
import getData from './data'

Mock.mock('mdata1/mdata1','get',getData)