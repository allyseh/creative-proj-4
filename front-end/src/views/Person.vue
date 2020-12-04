<template>

<div class="people">
  <h1>My People</h1>
  <div class="display-person" v-for="person in persons" :key="person.id"> 
    
    <div class="display" v-if="!person.editDisplay">   
      <h2>{{person.name}}</h2>
      <div class="display-line">
        <h3> Gender: </h3> 
        <p> {{person.gender}} </p>
        <h3> Age: </h3>
        <p> {{person.age}} </p>
        <h3> Relation: </h3>
        <p> {{person.relation}} </p>
      </div>
      <div class="display-line">
        <h3> Likes: </h3>
        <p> {{person.likes}} </p>
      </div>
      <div class="buttons">
        <button @click="toggleEdit(person)">Edit</button>
        <button @click="deletePerson(person)">Remove</button>
      </div>
    </div>
    
    <div class="edit" v-else>
      <input v-model="editing.name">
      <p></p>
      <input v-model="editing.gender"> <input v-model="editing.age"> <input v-model="editing.relation">
      <p></p>
      <textarea v-model="editing.likes"/>
      <p></p>
      <button @click="editPerson(person)">Done</button>
    </div>
  </div>
  
  <div class="heading">
    <h2>Add an Item</h2>
  </div>
  <div class="add">
    <div class="form">
      <input v-model="name" placeholder="Name">
      <p></p>
      <input v-model="gender" placeholder="Gender">
      <p></p>
      <input v-model="age" placeholder="Age">
      <p></p>
      <input v-model="relation" placeholder="Relation">
      <p></p>
      <textarea v-model="likes" placeholder="Likes"/>
      <p></p>
      <button @click="addPerson">Add</button>
    </div>
  </div>
</div>

</template>

<script>
import axios from 'axios';
export default {
  name: 'Person',
  data() {
    return {
      name: "",
      gender: "",
      age: null,
      relation: "",
      likes: "",
      persons: [],
      editing: null,
    }
  },
  created() {
    this.getPersons();
  },
  methods: {
    async getPersons() {
      try {
        let response = await axios.get("/api/persons");
        this.persons = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async addPerson() {
      try {
        await axios.post('/api/persons', {
          name: this.name,
          gender: this.gender,
          age: this.age,
          relation: this.relation,
          likes: this.likes,
          editDisplay: false,
        });
        this.name = "";
        this.gender = "";
        this.relation = "";
        this.age = null;
        this.likes = "";
        this.getPersons();
      } catch (error) {
        console.log(error);
      }
    },
    async deletePerson(person) {
      try {
        await axios.delete("/api/persons/" + person._id);
        this.getPersons();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async toggleEdit(person) {
      console.log("before: " + person.editDisplay);
      await axios.put("/api/persons/" + person._id, {
          editDisplay: true,
      });
      console.log("after: " + person.editDisplay);
      if (person.editDisplay) 
        this.editing = person;
      this.getPersons();
    },
    async editPerson(person) {
      try {
        await axios.put("/api/persons/" + person._id, {
          name: this.editing.name,
          gender: this.editing.gender,
          age: this.editing.age,
          relation: this.editing.relation,
          likes: this.editing.likes,
          editDisplay: false,
        });
        this.getPersons();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
}
</script>

<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
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

.form {
  margin-right: 50px;
}
</style>
