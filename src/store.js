import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({

      state:{
        organizeCode:"qy2",
        userName: "qcr" ,
        password: "123456"
      },

      mutations:{
        setUserName(state,userName){
          state.userName=userName;
        },
        setPassword(state,password){
          state.password=password;
        },
        getUserName(state){
          return state.userName;
        },
        getPassword(state) {
          return state.password
        },
        getOrganizeCode(state) {
          return state.organizeCode;
        }
      },

      actions:{
//cxt是一个store实例
        //调用action方法$store.dispatch("saveUserName");
        doLogin(cxt, userName, password) {
          //to login
          console.log("doLogin");
          axios.post('/commonApi/manage/appLogin', {
            userName: cxt.commit("getOrganizeCode")+"_"+cxt.commit("getUserName"),
            password: cxt.commit("getPassword")
          })
            .then(function (response) {
              console.log(response.data);

            })
            .catch(function (error) {
              console.log(error);
            });
        }

      }

})


