<template>

<div class="gifts">
  <h1 class="my-gifts">My Gifts</h1>
  <div class="display-gifts" v-for="gift in gifts" :key="gift.id"> 
    
    <div class="display" v-if="!gift.editDisplay">  
      <hr>
      <h2>{{gift.title}}</h2>
      <div class="display-line">
        <h3> Description: </h3> 
        <p> {{gift.desc}} </p>
      </div>
      <div class="display-line">
        <h3> Price: </h3>
        <p> {{gift.price}} </p>
      </div>
      <div class="buttons">
        <button @click="toggleEdit(gift)" class="editB">Edit</button>
        <button @click="deleteGift(gift)" class="removeB">Remove</button>
      </div>
    </div>
    
    <div class="edit" v-else>
      <hr>
      <input class="edit-line" v-model="editing.title">
      <p></p>
      <textarea class="edit-line" v-model="editing.desc"/>
      <p></p>
      <input class="edit-line" v-model="editing.price">
      <p></p>
      <button class="edit-line" @click="editGift(gift)">Done</button>
    </div>
  </div>
 
  <div class="add">
    <hr>
    <h2>Add A Gift</h2>
    <div class="form">
      <input v-model="title" placeholder="Title" class="form-line"> <br>
      <textarea v-model="desc" placeholder="Description" class="form-line"/> <br>
      <input v-model="price" placeholder="Price" class="form-line"> <br>
      <button @click="addGift">Add</button>
    </div>
  </div>
</div>

</template>

<script>
import axios from 'axios';
export default {
  name: 'Gift',
  data() {
    return {
      title: "",
      desc: "",
      price: null,
      gifts: [],
      editing: null,
    }
  },
  created() {
    this.getGifts();
  },
  methods: {
    async getGifts() {
      try {
        let response = await axios.get("/api/gifts");
        this.gifts = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async addGift() {
      try {
        await axios.post('/api/gifts', {
          title: this.title,
          desc: this.desc,
          price: this.price,
          editDisplay: false,
        });
        this.title = "";
        this.desc = "";
        this.price = "";
        this.getGifts();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteGift(gift) {
      try {
        await axios.delete("/api/gifts/" + gift._id);
        this.getGifts();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async toggleEdit(gift) {
      await axios.put("/api/gifts/" + gift._id, {
          title: gift.title,
          desc: gift.desc,
          price: gift.price,
          editDisplay: true,
      });
      this.editing = gift;
      this.getGifts();
    },
    async editGift(gift) {
      try {
        await axios.put("/api/gifts/" + gift._id, {
          title: this.editing.title,
          desc: this.editing.desc,
          price: this.editing.price,
          editDisplay: false,
        });
        this.getGifts();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
}
</script>

<style scoped>
.people {
  font-family: 'Montserrat', sans-serif;
}
.my-people {
  font-size: 32px;
  margin-bottom: 40px;
}
hr {
  border: 1px solid #6BAC6A;
}
.display {
  margin-left: 20px;
  margin-top: 10px;
}
.edit {
  margin-left: 20px;
  margin-top: 10px;
}
.edit-line {
  margin-left: 20px;
}
.display h2 {
  font-size: 28px;
  margin-bottom: 10;
  margin-left: 8px;
}
.display h3 {
  font-size: 18px;
  margin-bottom: 12px;
}
.display-line {
  display: flex;
  align-items: center;
  margin: 0px 0px 0px 20px;
  padding-top: 0px;
  padding-bottom: 0px;
}
.display-line p {
  margin: 0px 30px 0px 10px;
}
.display-line h3, p {
  margin-top: 0px;
  margin-bottom: 0px;
  padding-top: 0px;
  padding-bottom: 15px;
}
.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}
.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}
/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}
button {
  margin-top: 10px;
  margin-right: 10px;
  text-size: 12px;
  color: #1C454F;
}
.buttons {
  margin-left: 150px;
  margin-bottom: 10px;
  
}
.editB {
  background-color: #72FBA6;
}
.removeB {
  background-color: #FC8062;
}
.add {
  margin-left: 20px;
}
.add h2 {
  font-size: 22px;
  margin: 45px 0px 25px 8px;
}
.form {
  margin-right: 50px;
}
.form-line {
  margin-bottom: 20px;
  margin-left: 20px;
}
.form input {
  margin-right: 10px;
}
.form button {
  margin-top: 10px;
  margin-left: 20px;
  background-color: #FCF97F;
}
</style>
