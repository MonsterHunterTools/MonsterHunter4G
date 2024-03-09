import request from '@/utils/request';
export default {
  getTest() {
    return request({ url: `/test/getlist`, method: 'GET' });
  },
  postTest(data: any) {
    return request({ url: `/test/postdata`, method: 'POST', data });
  }
};
