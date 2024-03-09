import request from '@/utils/request';
export default {
  getTest(data: any) {
    return request({ url: `/api/v1/mqtt/getKeyboardDataImpl`, method: 'GET' });
  },
  postTest(data: any) {
    return request({ url: `/api/v1/mqtt/getKeyboardDataImpl`, method: 'POST', data });
  }
};
// export const getTest = (data: any) => {
//   return request({ url: `/api/v1/mqtt/getKeyboardDataImpl`, method: 'GET' })
// }
// export default {
//   getTest
// }
