import Mock from 'mockjs';
import LoginAPI from './login';
import HomeAPI from './home';
import FlightSearchAPI from './flight-search';

// 登录相关
Mock.mock(/\/userRestFacade\/login/, 'post', LoginAPI.login);
Mock.mock(/\/userRestFacade\/quit/, 'post', LoginAPI.logout);
Mock.mock(/\/userRestFacade\/getUserName/, 'post', LoginAPI.getUserInfo);
Mock.mock(/\/userRestFacade\/permissionMenu/, 'post', LoginAPI.getPermissionMenu);

// 首页
Mock.mock(/\/index\/chartData/, 'get', HomeAPI.getChartData);

// 航班查询
Mock.mock(/\/flightSearch\/mounted/, 'get', FlightSearchAPI.getMounted);
Mock.mock(/\/flightSearch\/searchName/, 'get', FlightSearchAPI.getPilotName);
Mock.mock(/\/flightSearch\/getList/, 'get', FlightSearchAPI.getList);
Mock.mock(/\/flightSearch\/getByService/, 'get', FlightSearchAPI.getListService);
Mock.mock(/\/flightSearch\/getFlight/, 'get', FlightSearchAPI.getFlight);

export default Mock;
