<template>
  <div id="dashboard">
    <ul class="collection with-header">
      <li class="collection-header"><h4>Products</h4></li>
      <li v-for="product in products" v-bind:key="product.id" class="collection-item">
        <div class="chip">{{product.category}}</div>
        {{product.productId}} | {{product.name}}: {{product.description}}

        <router-link class="secondary-content" 
        v-bind:to="{name: 'view-product', params: {ID: product.productId}}">
          <i class="fa fa-eye"></i>
        </router-link>
      </li>
    </ul>

    <div class="fixed-action-btn">
        <router-link to="/new" class="btn-floating btn-large red">
          <i class="fa fa-plus"></i>
        </router-link>
    </div>
  </div>
</template>

<script>
import db from './firebaseInit';
export default {
  name: "dashboard",
  data(){
      return {
          products: []
      }
  },
  created(){ //Once component is created, we fetch the data
    db.collection('Products').get().then(
      result => {
        result.forEach(doc => {
          const data = {
            'id': doc.id, //Firebase id
            'productId': doc.data().ID,
            'description': doc.data().Description,
            'category': doc.data().Category,
            'internalCode': doc.data().InternalCode,
            'name': doc.data().Name
          }
          this.products.push(data);
        })
      }
    )
  }
}
</script>
