export default{
    template: `
    <div class="hello">
        <div class="container">
            <div class="my-5 row movie" v-for="item in movies" 
                :key="item.id">
                <img :src="item.image" alt="" class="col-2 img-fluid">
                <div class="col movie-content">
                    <div class="movie-title">
                    <h5 class="fw-bold">{{item.title}}</h5>
                    <p class="me-3 badge text-wrap" :class="grading[item.tag[1]]">{{item.tag[1]}}</p>
                    <p class="badge bg-secondary text-wrap">片長: {{item.tag[0]}}</p>
                    </div>
                    
                    <template class="movie-time" v-for="time in products" :key="time.id">
                        <button type="button" 
                                class="me-3 btn btn-outline-primary" 
                                v-if="time.description===item.id"
                                @click="$emit('open',time, item)">
                            {{time.category}}
                        </button>
                    </template>
                </div>
            </div>
        </div>
    </div>`,
    props: {
        movies: Array,
        products: Array,
      },
      data() {
        return {
          addMovieCanvas:{},
          temp:{},
          id:'',
          grading:{
            '普通級':'bg-success',
            '保護級':'bg-primary',
            '輔導級':'bg-warning',
            '限制級':'bg-danger'
          }
        }
      },
      mounted() {
        
      },
      methods: {
        
        pushData(){
         
        }
      },
}