<template>
  <div class="home">
    <!-- <el-button @click="add">xxxxxxxxxx</el-button>
    <el-button type="primary" @click="add">xxx</el-button>
    <el-button type="info" @click="add">xxx</el-button>
    <div>{{count}}</div> -->
    <el-table :data="tableData">
      <el-table-column prop="itemName" label="商品名称">
      </el-table-column>
      <el-table-column prop="itemId" label="商品编号" width="120">
      </el-table-column>
      <el-table-column prop="itemPrice" label="价格">
      </el-table-column>
      <el-table-column prop="itemLocPro" label="省">
      </el-table-column>
      <el-table-column prop="itemLocCity" label="市">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 调用showEdit传递 商品数据 -->
          <el-button @click="showEdit(scope.row)" size="mini">编辑</el-button>
          <el-button size="mini">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
          :current-page="page"
          :page-sizes="[10,20,30,50,100]"
          :page-size="size"
          :total="totalCount"
          layout="total,sizes,prev,pager,next,jumper">
      </el-pagination>
    </div>
    <el-dialog title="商品编辑" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="formRules">
          <el-form-item label="商品名称" prop="itemName">
            <el-input v-model="form.itemName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="itemPrice">
            <el-input v-model="form.itemPrice" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveData">确 定</el-button>
        </div>
    </el-dialog>
  </div>
</template>
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import api from './../api';
export default {
  name: 'Home',
  components: {},
  data(){
    //自定义验证规则
      const checkPrice=(rule,value,callback)=>{
        if(value<=0){
          return callback(new Error('价格不能为0或负数'))
        }else if(value>10000){
          return callback(new Error('价格不能高于10000元'))
        }
        callback();
      }
      return {
        dialogFormVisible:false,
        tableData: [],
        totalCount:0,//总的数据条数
        page:1,
        size:10,
        //表单验证
        formRules:{
          itemName:[
                {required:true,message:"请输入商品名称",trigger:'blur'}
          ],
          itemPrice:[
                {required:true,message:"请输入商品价格",trigger:'blur'},
                {validator:checkPrice,trigger:'blur'}
          ]
        },
        form:{
          id:0,
          itemName:'',
          itemPrice:''
        }
      }
  },
  //计算属性：监听数据仓库中的count
  computed:{
    // count(){
    //   return this.$store.state.count;
    // }
  },
  mounted(){
    this.loadData();
  },
  //方法：提交给数据仓库进行操作
  methods:{
    async saveData(){
      const loading = this.$loading();
      try {
        let result=await api.saveGoods(this.form);
        loading.close();
        if(result.code!=0){
          console.log(err)
            this.$alert(result.message);
            return;
        }
        //修改成功
        this.loadData();//刷新数据
        this.dialogFormVisible=false;//隐藏弹出框
      } catch (error) {
        loading.close();
        this.$alert('修改数据失败');
      }
    },
    showEdit(goodsData){
      this.form={
        itemPrice:goodsData.itemPrice,
        itemName:goodsData.itemName,
        id:goodsData.itId,
      };//要修改的数据
      this.dialogFormVisible=true;//显示dialogFormVisible
    },
    //每页的条数
    handleSizeChange(size){
      this.size=size;//保存每页条数
      this.loadData()//重新加载数据
    },
    //总共分多少页
    handlePageChange(page){
      this.page=page;//保存页数
      this.loadData()//重新加载数据
    },
    //加载数据
    async loadData(){
        api.getList(this.page,this.size).then(data=>{
          if(data.code==0){
            this.tableData=data.data.list;
            this.totalCount=data.data.total;
          }
        }).catch(err=>{
          this.$message.info('加载数据异常');
        })
    },
    //
    add(){
      this.$store.state.count++;
    }
  }
}
</script>
