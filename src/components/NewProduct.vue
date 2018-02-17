<template>
  <div id="new-product">
      <h3>New Product</h3>
      <div class="row">
        <form @submit.prevent="saveProduct" class="col s12">
            <div class="row">
              <div class="input-field col s12">
                <input type="text" v-model="productId" required>
                <label>Product ID</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input type="text" v-model="internalCode" required>
                <label>Internal Code</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input type="text" v-model="name" required>
                <label>Name</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input type="text" v-model="description" required>
                <label>Description</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input type="text" v-model="category" required>
                <label>Category</label>
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
  name: "new-product",
  data(){
    return {
      productId: null,
      category: null,
      internalCode: null,
      name: null,
      description: null
    }
  },
  methods: {
    saveProduct() {
      db.collection('Products').add({
        ID: this.productId,
        InternalCode: this.internalCode,
        Name: this.name,
        Description: this.description,
        Category: this.category
      })
      .then(doc => this.$router.push('/'))
      .catch(error => console.log(error))
    }
  }
}
</script>
