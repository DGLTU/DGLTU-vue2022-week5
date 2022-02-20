import movieList from './components/movieList.js'
import cartList from './components/cartList.js'
import movieOffcanvas from './components/movieOffcanvas.js'
const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);

loadLocaleFromURL('https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json');

configure({ // 用來做一些設定
  generateMessage: localize('zh_TW'), //啟用 locale 
});

const app = Vue.createApp({
    data() {
        return {
            products: [],
            movies: [],
            cartData:{},
            carts:[],
            disabled:false,
            form: {
                user: {
                    name: '',
                    email: '',
                    tel: '',
                    address: '',
                },
                message: '',
            },
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        getData() {
            this.api('get', 'articles').then((res) => {
                const { articles } = res.data
                this.movies = articles
            })
            this.api('get', 'products').then((res) => {
                const { products } = res.data
                this.products = products
                //依照時間排序
                this.products = this.products.sort((a, b) => {
                    return Date.parse(new Date(a.category)) > Date.parse(new Date(b.category)) ? 1 : -1;
                })
            })
            this.api('get','cart').then((res)=>{
                const { carts } = res.data.data
                this.carts = carts
                this.cartData = res.data.data
            })
        },
        api(http,path,data=null){
            const apiPath = 'lesley588'
            const baseUrl= 'https://vue3-course-api.hexschool.io'
            const apiConfig = {
                method: http,
                url: `${baseUrl}/v2/api/${apiPath}/${path}`,
                data:data
            }
            return axios(apiConfig)
        },
        openOffcanvas(timeTemp,movieTemp){
            this.$refs.addMovie.open(timeTemp,movieTemp)
        },
        addCart(id,qty){
            const data={
                "product_id":id,
                "qty":qty,
            }
            this.api('post','cart',{data})
                .then((res)=>{
                    alert(res.data.message)
                    this.getData()
                    this.$refs.addMovie.close()
                }).catch((err)=>{
                    console.log(err.message);
                    
                })
        },
        updateCart(id,qty){
            this.disabled=true
            this.api('put',`cart/${id}`,{data:{'product_id':id,'qty':qty}})
            .then(()=>{
                this.getData()
                this.disabled=false
            })
        },
        delAllCart(){
            this.disabled=true
            this.api('delete',"carts").then(()=>{
                this.getData()
                this.disabled=false
            })
        },
        delCart(id){
            this.disabled=true
            this.api('delete',`cart/${id}`).then(()=>{
                this.getData()
                this.disabled=false
            })
        },
        addOrder(){
            if(this.carts.length===0){
                alert('你還未訂購票券')
                return
            }
            this.api('post','order',{data:this.form})
            .then((res)=>{
                alert(res.data.message)
                this.$refs.form.resetForm()
                this.getData()
            })
            
        }
    },
    components: {
        movieList,
        cartList,
        movieOffcanvas,
        vForm: Form,
        vField: Field,
        errorMessage: ErrorMessage,
    }
})

app.mount('#app')

