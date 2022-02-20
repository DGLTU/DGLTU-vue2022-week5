export default{
    props:['carts','cartData','isDisabled'],
    
    template:`
    <div class="w-50 container">
        <div class="mt-4">
            <!-- 購物車列表 -->
            <div class="text-end">
                <button class="btn btn-outline-danger" 
                        type="button" 
                        @click="deleteAll"
                        >
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="false" v-if="isDisabled"></span>
                        清空購物車</button>
            </div>
            <table class="table align-middle">
                <thead>
                <tr> <h1>購物車</h1> </tr>
                <tr>
                    <th></th>
                    <th>電影名稱</th>
                    <th style="width: 150px">數量/單位</th>
                    <th style="width: 300px">單價</th>
                </tr>
                </thead>
                <tbody>
                <template  v-for="item in carts">
                    <tr>
                    <td>
                        <button type="button" 
                                class="btn btn-outline-danger btn-sm " 
                                @click="del(item.id)">
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="false" v-if="isDisabled"></span>
                        X
                        </button>
                    </td>
                    <td>{{item.product.content}}<br>{{item.product.title}}  {{item.product.category}}</td>
                    <td>
                        <div class="input-group input-group-sm">
                            <div class="input-group mb-3">
                                <select 
                                    type="number" 
                                    class="form-select" 
                                    :selected="item.qty" 
                                    v-model.number="item.qty"
                                    @change="update(item.id,item.qty)"
                                    :disabled="isDisabled">
                                    <option :value="num" v-for="num in 10" :key="num+00">{{num}}</option>
                                </select>
                                <span class="input-group-text" id="basic-addon2">{{item.product.unit}}</span>
                            </div>
                        </div>
                    </td>
                    <td class="text-end"> {{item.product.price}} 元</td>
                </tr>   
                </template>
                </tbody>
                <tfoot>
                <tr>
                    <td colspan="3" class="text-end">總計</td>
                    <td class="text-end">{{cartData.total}}</td>
                </tr>
                </tfoot>
            </table>
        </div>
    </div>
    `,
    methods: {
        update(id,qty){
            this.$emit('updateQty',id,qty)
        },
        del(id){
            this.$emit('delCart',id)
        },
        deleteAll(){
            this.$emit('delAll')
        },
    },
}