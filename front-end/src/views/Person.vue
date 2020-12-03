<template>
<div class="people">
  <h1>My People</h1>
    <div class="display-person" v-for="person in persons" :key="person.id"> 
     <div class="person-display" v-if="!person.editDisplay">
      <h2>{{person.name}}</h2>
      <p><h3>Gender:</h3> {{person.gender}} <h3>Age:</h3> {{person.age}} <h3>Relation:</h3> {{person.relation}} </p>
      <p><h3>Likes:</h3> {{person.likes}} </p>
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
        <textarea v-model="editing.likes">
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
      <textarea v-model="likes" placeholder="Likes">
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
    async addPerson() {
      try {
        const formData = new FormData();
        formData.append(this.file, this.file.name)
        let r = await axios.post('/api/persons', {
          name: this.name,
          gender: this.gender,
          age: this.age,
          relation: this.relation,
          likes: this.likes,
          editDisplay: false,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getPersons() {
      try {
        let response = await axios.get("/api/persons");
        this.persons = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(person) {
      try {
        await axios.delete("/api/persons/" + person._id);
        this.getPersons();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    toggleEdit(person) {
      person.editDisplay = !person.editDisplay;
      if (person.editDisplay) 
        editing = person;
    }
    async editPerson(person) {
      try {
        await axios.put("/api/persons/" + person._id, {
          name: this.editing.name,
          gender: this.editing.gender,
          age: this.editing.age,
          relation: this.editing.relation,
          likes: this.editing.likes,
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

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
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

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
</style>
