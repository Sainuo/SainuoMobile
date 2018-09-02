import axios from "axios"
import Utility from "~/static/javascript/utility"
axios.interceptors.request.use(
    request=>{
        request.params=Utility.toServerModel(request.params);
        if((/^application\/json/i).test(request.headers['content-type'])){
            request.data=Utility.toServerModel(request.data);
        }
        return request;
    },
    error=>error
);
axios.interceptors.response.use(
    response => {
        if((/^application\/json/i).test(response.headers['content-type'])){
            response.data=Utility.toClientModel(response.data);
        }
        return response
    },
    error => {
        let viewModel = window.$nuxt;
        if (typeof error.response === "undefined") {
            viewModel.$alert("无法连接服务器",{
                showClose: true,
                duration: 5000,
                type: 'error'
            });
        }
        else if (typeof error.response.status === "number" && error.response.status === 401) {
            viewModel.$alert('会话过期', {
                type: "error",
                showClose: false,
                closeOnClickModal: false,
                closeOnPressEscape: false,
                confirmButtonText: '重新登录',
                callback: action => {
                    //viewModel.$router.replace("/");
                    window.location.href="/login";
                }
            });
        }
        else if (typeof error.response.data.error === "object" && typeof error.response.data.error.message === "string") {
            viewModel.$alert(error.response.data.error.message, {
                showClose: true,
                duration: 5000,
                type: 'error'
            });
        }
        else if (typeof error.response.error === "object" && typeof error.response.error.message === "string") {
            viewModel.$alert(error.response.error.message, {
                showClose: true,
                duration: 5000,
                type: 'error'
            });
        }
        else if (typeof error.message === "string") {
            viewModel
                .$message({
                    showClose: true,
                    message: error.message,
                    duration: 5000,
                    type: 'error'
                });
        }
        else {
            viewModel
                .$message({
                    showClose: true,
                    message: error.message,
                    duration: 5000,
                    type: 'error'
                });
        }
        return Promise.reject(error);
    }
)