import axios from 'axios'
import API from '../api'
import qs from 'qs'

export default function http({ url, method, data }) {
    let options = {
        url: url,
        method: method,
        baseURL: API.SAT_HOST,
        contentType: "application/json;charset=UTF-8",
        // timeout: 2000,
        withCredentials: false,
        // headers:{Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI1Iiwic3ViIjoi6ZuG5Zui55So5oi3IiwiaWF0IjoxNTU4MzMxNDk5LCJhcGlzIjoiQVBJLVJPTEUtU0VBUkNILEFQSS1QRVJNSVNTSU9OLVVQREFURSxBUEktUk9MRS1TRUFSQ0hJRCxBUEktUk9MRS1VUERBVEUsQVBJLVBFUk1JU1NJT04tU0VBUkNISUQsQVBJLVBFUk1JU1NJT04tREVMRVRFICxBUEktVVNFUi1TQVZFLEFQSS1VU0VSLVVQREFURVx0LEFQSS1ST0xFLUFTU0lHTlBSRU0sQVBJLVVTRVItU0VBUkNISUQsQVBJLVVTRVItU0VBUkNILEFQSS1QRVJNSVNTSU9OLUFTU0lHTlBSRU0sQVBJLVVTRVItQVNTSUdOUk9MRVMsQVBJLVBFUk1JU1NJT04tU0VBUkNILEFQSS1PUkdBTklaQVRJT04tU0VBUkNILEFQSS1ST0xFLVNBVkUsQVBJLVBFUk1JU1NJT04tU0FWRSxBUEktUk9MRS1BVkFJTEFCTEUsIn0.78QEBcJFNAWmVAoAcZcXa0_w2TwN-HNoWmtoaodRLbA'}
    };

    if (method == 'GET') {
        options.params = data;
    } else if (method == "POST") {
        options.data = qs.stringify(data);
    }

    return axios(options);

}