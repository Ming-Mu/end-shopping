import Vue from 'vue'
import Vuex from 'vuex'
//使用vuex
Vue.use(Vuex)
//导出Store
export default new Vuex.Store({
  //state数据仓库
  state: {
    count:0,
    //登录用户信息
    user:null,
  },
  getters:{
    count(state){
      return state.count;
    },
    user(state){
      if(state.user == null){
        //检查本地是否存在数据
        var userDate=sessionStorage.getItem('login_user_info');
        if(userDate){
          state.user =JSON.parse(userDate)//将用户数据转为json对象
        }
      }
      return state.user;
    }
  },
  //mutations与action类似，但它是操作（改变）数据仓库数据的方法
  mutations: {
    add(state){
      state.count++;
    }
  },
  //action与mutations类似，但它是获得组件中的add方法后提交给mutation，由mutation进行操作
  actions: {
    add(ctx){
      //这一步（action）可以省略，再组件中直接使用commit方法可以提交给mutation
      ctx.commit('add');
    },
    //保存count
    setCount(ctx,number){
      ctx.state.count=number;
    },
    //保存用户数据
    setUser(ctx,user){
      //保存数据状态
      ctx.state.user=user;
      //把数据存到sessionStorage
      sessionStorage.setItem('login_user_info',JSON.stringify(user));
    }
  },
  //store模块化
  modules: {
  }
})
