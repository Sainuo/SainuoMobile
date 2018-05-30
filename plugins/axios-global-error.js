import axios from "axios"

axios.interceptors.response.use(
    response => response,
    error => {
        let viewModel = window.$nuxt;
        if (typeof error.response.status==="number" &&  error.response.status === 401) {
            viewModel.$alert('会话过期', {
                type: "error",
                showClose: false,
                closeOnClickModal: false,
                closeOnPressEscape: false,
                confirmButtonText: '重新登录',
                callback: action => {
                    viewModel.$router.replace("/");
                }
            });
        }
        else if(typeof error.message==="string"){
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
                    message: error.response.data.error.message,
                    duration: 5000,
                    type: 'error'
                });
        }
        return Promise.reject(error);
    }
)