export const api_config = {
  baseUrl: 'http://localhost:3000/',   
  headers :
    {
        headers:{
            Authorization : `Bearer ${localStorage.getItem('token')}`
        }
    } ,
  defaultEndPoint: 'tasks'
  
} as const;
