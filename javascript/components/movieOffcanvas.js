export default{
    template:`
    <div class="w-50 offcanvas offcanvas-end" ref="addMovie" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" >
    <div class="offcanvas-header">
        <h3 class="fw-bold" id="offcanvasRightLabel">{{movieTemp.title}} </h3>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body ">
        <div class="w-75 mx-auto">
            <div class="row">
                <img class="col-5 img-fluid"
                :src="movieTemp.image" alt="" />
                <div class="col-5 fw-bold fs-5 addCart d-flex flex-column justify-content-start">
                    <p>日期: {{timeTemp.title}}</p>
                    <p>時間: {{timeTemp.category}}分</p>
                    <div class="input-group">
                        <select class="form-select" name="seatNum" id="seatNum" v-model="qty">
                            <option :value="num" v-for="num in 10" :key="num&1" >{{num}}</option>
                        </select>
                        <span class="input-group-text" id="basic-addon2">{{timeTemp.unit}}</span>
                    </div>
                    <a href="#cart">
                        <button class="mt-3 btn btn-danger" @click="$emit('add',timeTemp.id,qty)">訂票</button>
                    </a>
                </div>
            </div>
            <div class="mt-5 body-text">
                <p>{{movieTemp.description}}</p>
            </div>
        </div>
    </div>
    </div>
    <!-- offcanvas end -->
    `,
    data() {
        return {
            addMovie:{},
            movieTemp:{},
            timeTemp:'',
            qty:1,
        }
    },
    mounted() {
        this.addMovie = new bootstrap.Offcanvas(this.$refs.addMovie,{
            backdrop:false
        })
    },
    methods: {
        open(timeTemp,movieTemp){
            this.timeTemp = timeTemp
            this.movieTemp = movieTemp
            this.addMovie.show()
        },
        close(){
            this.addMovie.hide()
        }
    },
}