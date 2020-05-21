<template>
    <div class="login-page">
        <div class="logo">
            <img style="width:60px;height:60px" src="../assets/logo.png">
        </div>
        <div class="login-box" v-loading="showLoading">
            <el-form :model="loginModel" :rules="rules" ref="loginForm">
                <el-form-item>
                    <el-input prefix-icon="el-icon-user" v-model="loginModel.username" placeholder="请输入登录名称"/>
                </el-form-item>
                <el-form-item>
                    <el-input prefix-icon="el-icon-lock" v-model="loginModel.password" placeholder="请输入密码"/>
                </el-form-item>
                <el-row type="flex">
                    <el-col style="text-align:left">
                        <el-checkbox>自动登录</el-checkbox>
                    </el-col>
                    <el-col></el-col>
                    <el-col style="text-align:right">
                        <router-link to="/forget"> 忘记密码</router-link>
                    </el-col>
                </el-row>
                <el-form-item style="margin-top:10px">
                    <el-button type="primary" style="width:100%" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import api from "../api";
import {mapActions} from 'vuex';
export default {
    data(){
        const checkUserName=(rule,value,callback)=>{
            if(value == 'admin'){
                callback();
            }else{
                callback(new Error("登录名必须时admin"));
            }
        };
        return{
           loginModel:{
               username:"",
               password:""
           },
            showLoading:false,
            //表单验证规则
            rules:{
                username:[
                    {required:true,message:'请输入用户名',trigger:'blur'},
                    //自定义验证
                    {validator:checkUserName,trigger:"blur"}
                ],
                password:[{
                    required:true,message:'请输入密码',trigger:'blur'},
                    {
                        min:6,
                        max:16,
                        message:"密码长度必须在6到16个字符",
                        trigger:'blur'
                    }
                ]
            }
        };
    },
    methods:{
        //引入store中的action方法
        ...mapActions(['setUser']),
        login(){
            this.$refs['loginForm'].validate(valid=>{
                if(valid){
                    //验证通过
                    const loading=this.$loading({
                        text:"登录中......"
                    });
                    //开始登录
                      //1.异步（使用promise格式）
                    api.login(this.loginModel.username,this.loginModel.password)
                            .then(user => {
                                //登录请求发送成功
                                console.log("登录请求发送中")
                                loading.close();
                                if(user.code!=0){
                                    this.$message.error(user.message)
                                    return;//结束执行后续代码
                                }
                                this.setUser(user.data);
                            }).catch(err => {
                                //登录失败
                                loading.close();
                                console.log(err);
                            })
                }else{
                    this.$alert('输入的登录信息不正确')
                }
            });
            
        }
    }
};
</script>
<style scoped lang="less">
    .login-box{
        width:400px;
        margin:auto
    }
    .login-page{
        background: url(./../assets/login-bg.svg) no-repeat;
        background-size: 100% 100%;
        height: 100vh;
    }
    .logo{
        padding: 100px 0 50px;
    }
</style>