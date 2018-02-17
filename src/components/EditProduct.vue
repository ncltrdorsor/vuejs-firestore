<template>
  <div id="edit-prduct">
    <h3>Edit Product</h3>
    <div class="row">
      <form @submit.prevent="updateProduct" class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <input disabled type="text" v-model="productId" required>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input type="text" v-model="internalCode" required>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input type="text" v-model="name" required>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input type="text" v-model="description" required>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input type="text" v-model="category" required>
            </div>
          </div>
          <button type="submit" class="btn">Submit</button>                                   
          <router-link to="/" class="btn grey">Back</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit';
export default {
  name: "edit-product",
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
    updateProduct(){
      db.collection('Products')
      .where('ID', '==', this.$route.params.ID)
      .get()
      .then(result => {
        result.forEach(doc => {
          doc.ref.update({
            ID: this.productId,
            InternalCode: this.internalCode,
            Name: this.name,
            Description: this.description,
            Category: this.category            
          })
          .then(() => { 
            this.$router.push({name: 'view-product', params: {ID: this.productId}}) 
          })
          .catch(error => console.log(error))
        })
      })      
    }
  }    
}
</script>
