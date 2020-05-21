
const post =function(url,data){
    //把json封装成表单对象
    const formData=new FormData();
        for(let k in data){
            formData.append(k,data[k]);
        }
        return fetch(url, {
            body: formData,
            method: 'POST',
            cache: 'no-cache',
        }).then(res =>res.json())
}
const get=async function(url){
    const res = await fetch(url, { method: 'GET' });
    return res.json();
}
const BASE_URL='http://wx.wm-app.xyz/demo/goods/api';
export default{
    login(username,password){
        return post(BASE_URL+'/login',{username,password})
    },
    getList(page=1,size=10){
        return get(BASE_URL+'/?page='+page+'&size='+ size);
    },
    saveGoods(data){
        return post(BASE_URL + '/save',data);
    }
}