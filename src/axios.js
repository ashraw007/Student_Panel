import axios from 'axios'


let instance = axios.create({
  })

instance.interceptors.response.use( function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    
    if(error.message === "Network Error"){

        const error = {}
        error.response = {}
        error.response.data = {}
        error.response.data.errorMessage = "Kindly check your internet, if problem presist. contact collage"
        return Promise.reject({...error.response.data})
    }

    if(!error.response){
        return Promise.reject()
    }

   
    if(error.response.data){
        if(error.response.status === 401 && error.response.data.error === "Please Authenticate"){
            window.location.href = "/"
        }
    }

   
    return Promise.reject({...error.response.data})
  });
export default instance