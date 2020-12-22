import Vue from "vue"
import "bootstrap/dist/css/bootstrap.css"

Vue.filter("dateFormat", function (dateStr,patten) {
    var date = new Date(dateStr);

    var year = date.getFullYear();

    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');


    if (patten.toLowerCase() === 'yyyy-mm-dd') {

        return `${year}-${month}-${day}`
    }
    else{
        var hour=date.getHours().toString().padStart(2,'0');
        var minute=date.getMinutes().toString().padStart(2,'0');
        var second=date.getSeconds().toString().padStart(2,'0');
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`
    }
})

Vue.directive("focus",{
    inserted(el){
        el.focus();
    }

})
Vue.directive("color",{
    bind(el,binding) {
        el.style.color=binding.value
    }
})


var vm = new Vue({
    el: "#app",
    data: {
        id: "",
        name: "",
        keywords: "",
        list: [{
                id: 1,
                name: "奔驰",
                ctime: new Date()
            },
            {
                id: 2,
                name: "宝马",
                ctime: new Date()
            },
        ],

    },
    methods: {
        add() {
            if (this.id && this.name) {
                var obj = {
                    id: this.id,
                    name: this.name,
                    ctime: new Date(),
                };
                this.list.push(obj);
                this.id = this.name = "";
                this.$refs.idRef.focus();
            }
        },
        search() {
            return this.list.filter(item => {
                if (item.name.includes(this.keywords)) {
                    return true;
                }
            })
        },
        del(id) {
            var index = this.list.findIndex(item => item.id === id)
            this.list.splice(index, 1)
        }
    }
})