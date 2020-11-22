const axios = require('axios');
// const host = '/api'
const host = 'http://0.0.0.0:8000/api';
const headers = {
  'Content-Type': 'application/json'
};

const axiosInstance = axios.create({
  baseURL: host,
  timeout: 1000,
  headers: headers
});

function getUserList(handleUsersListData){
  axiosInstance.get('/users/')
  .then(response => {
    // handle success
    handleUsersListData({
      success: true,
      data: response.data.data
    })
  })
  .catch(error => {
    // handle error
    handleUsersListData({
      success: false
    })
  })
  .then(function () {
    // always executed
  });
}


function getUserSchema(handleUserSchemaData){
  axiosInstance.get("/users/api_schema/")
  .then(response => {
    handleUserSchemaData({
      success: true,
      data: response.data.data
    })
  })
  .catch(error => {
    handleUserSchemaData({
      success: false
    })
  })
  .then(function () {
  });
}

function userCreate(data, handleUserCreateData){
  axiosInstance.post("/users/", data)
  .then(response => {
    handleUserCreateData({
      success: true,
      data: response.data.data
    })
  })
  .catch(error => {
    handleUserCreateData({
      success: false,
      errors: error.response.data.errors
    })
  })
  .then(function () {
  });
}

function getUserData(id, handleUserData){
  axiosInstance.get(`/users/${id}/`)
  .then(response => {
    handleUserData({
      success: true,
      data: response.data.data
    })
  })
  .catch(error => {
    handleUserData({
      success: false,
      errors: error.response.data.errors
    })
  })
  .then(function () {
  });
}

function userEdit(id, data, handleUserEditData){
  axiosInstance.put(`/users/${id}/`, data)
  .then(response => {
    handleUserEditData({
      success: true,
      data: response.data.data
    })
  })
  .catch(error => {
    handleUserEditData({
      success: false,
      errors: error.response.data.errors
    })
  })
  .then(function () {
  });
}

export {  getUserList,  getUserSchema, userCreate, getUserData, userEdit };
