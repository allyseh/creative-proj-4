<template>

<div class="people">
  <h1 class="my-people">My People</h1>
  <div class="display-person" v-for="person in persons" :key="person.id"> 
    
    <div class="display" v-if="!person.editDisplay">  
      <hr>
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
        <button @click="toggleEdit(person)" class="editB">Edit</button>
        <button @click="deletePerson(person)" class="removeB">Remove</button>
      </div>
    </div>
    
    <div class="edit" v-else>
      <hr>
      <input v-model="editing.name">
      <p></p>
      <input v-model="editing.gender"> <input v-model="editing.age"> <input v-model="editing.relation">
      <p></p>
      <textarea v-model="editing.likes"/>
      <p></p>
      <button @click="editPerson(person)">Done</button>
    </div>
  </div>
 
  <div class="add">
    <hr>
    <h2>Add an Item</h2>
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
      await axios.put("/api/persons/" + person._id, {
          name: person.name,
          gender: person.gender,
          age: person.age,
          relation: person.relation,
          likes: person.likes,
          editDisplay: true,
      });
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

edit {
  margin-left: 40px;
  margin-top: 10px;
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

.form {
  margin-right: 50px;
}
</style>
