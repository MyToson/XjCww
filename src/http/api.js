import axios from "@/http/axios";
export const getTest = params => {
  return axios({
    url: `/weather/index?format=2&cityname=苏州&key=897fecfe2ad6955c7c7667756e9da4b5`,
    method: "get",
    params,
    judgeCode:"yes"
  });
};
export const getUser = params => {
  return axios({
    url: `/user`,
    method: "get",
    params,
    judgeCode:"yes"
  });
};