<template>
  <div id="view-product">
      <ul class="collection with-header">
        <li class="collection-header"><h4>{{name}}</h4></li>
        <li class="collection-item">Product ID: {{productId}}</li>
        <li class="collection-item">Category: {{category}}</li>        
        <li class="collection-item">Internal Code: {{internalCode}}</li>
        <li class="collection-item">Description: {{description}}</li>
      </ul>
      <router-link to="/" class="btn grey">Back</router-link>
      <button @click="deleteProduct" class="btn red">Delete</button>

      <div class="fixed-action-btn">
          <router-link v-bind:to="{name: 'edit-product', paramns: {ID: productId}}" class="btn-floating btn-large green">
            <i class="fa fa-pencil"></i>
          </router-link>
      </div>      
  </div>
</template>

<script>
import db from './firebaseInit';
export default {
  name: "view-product",
  data(){
    return {
        productId: null,
        category: null,
        internalCode: null,
        name: null,
        description: null
    }
  },
  beforeRouteEnter(to, from, next){
    db.collection('Products').where('ID', '==', to.params.ID).get()
    .then(result => {
      result.forEach(doc => {
        next(vm => {
          vm.productId = doc.data().ID,
          vm.name = doc.data().Name,
          vm.description = doc.data().Description,
          vm.category = doc.data().Category,
          vm.internalCode = doc.data().InternalCode
        })
      })
    })
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData(){
      db.collection('Products')
      .where('ID', '==', this.$route.params.ID)
      .get()
      .then(result => {
        result.forEach(doc => {
          this.productId = doc.data().ID,
          this.name = doc.data().Name,
          this.description = doc.data().Description,
          this.category = doc.data().Category,
          this.internalCode = doc.data().InternalCode
        })
      })
    },
    deleteProduct(){
      if(confirm('Are you sure you want to delete the product?')){
        db.collection('Products')
        .where('ID', '==', this.$route.params.ID)
        .get()
        .then(result => {
          result.forEach(doc => {
            doc.ref.delete();
            this.$router.push('/');
          })
        })
      }
    }
  }
}
</script>
