<template>
<div class="list">
  <h1 class="my-list">My List</h1>
  <div class="display-list" v-for="entry in entries" :key="entry.id"> 
    
    <div class="display" v-if="!entry.editDisplay">  
      <hr>
      <div class="entry-display">
        <div class="receiver">
          <h2> {{entry.receiver.name}} </h2> 
          <div class="display-line">
            <h3> Gender: </h3> 
            <p> {{entry.receiver.gender}} </p>
            <h3> Age: </h3>
            <p> {{entry.receiver.age}} </p>
            <h3> Relation: </h3>
            <p> {{entry.receiver.relation}} </p>
          </div>
          <div class="display-line">
            <h3> Likes: </h3>
            <p> {{entry.receiver.likes}} </p>
          </div>
        </div>
        <hr>
        <div class="gifts">
          <h2> {{entry.gift.title}} </h2> 
          <div class="display-line">
            <h3> Description: </h3> 
            <p> {{entry.gift.desc}} </p>
          </div>
          <div class="display-line">
            <h3> Price: </h3>
            <p> ${{entry.gift.price}} </p>
          </div>
        </div>
      </div>
      <div class="buttons">
        <button @click="toggleEdit(entry)" class="editB">Edit</button>
        <button @click="deleteEntry(entry)" class="removeB">Remove</button>
      </div>
    </div>
    
    <div class="edit" v-else>
      <hr>
      <div class="edit-entry">
        <input v-model="findName" placeholder="Receiver">
        <div class="suggestions" v-if="recSuggestions.length > 0">
          <div class="suggestion" v-for="s in recSuggestions" :key="s.id" @click="selectRec(s)">{{s.name}}
          </div>
        </div>
        <input v-model="findTitle" placeholder="Gift">
        <div class="suggestions" v-if="giftSuggestions.length > 0">
          <div class="suggestion" v-for="s in giftSuggestions" :key="s.id" @click="selectGift(s)">{{s.title}}
          </div>
        </div>
      </div>
      <button class="edit-line" @click="editEntry(entry)">Done</button>
    </div>
  </div>
 
  <div class="add">
    <hr>
    <h2>Add An Entry</h2>
    <div class="add-entry">
      <input v-model="findName" placeholder="Receiver">
      <div class="suggestions" v-if="recSuggestions.length > 0">
        <div class="suggestion" v-for="s in recSuggestions" :key="s.id" @click="selectRec(s)">{{s.name}}
        </div>
      </div>
      <input v-model="findTitle" placeholder="Gift">
      <div class="suggestions" v-if="giftSuggestions.length > 0">
        <div class="suggestion" v-for="s in giftSuggestions" :key="s.id" @click="selectGift(s)">{{s.title}}
        </div>
      </div>
    </div>
    <button @click="addEntry">Add</button>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
      receiver: null,
      gift: null,
      entries: [],
      persons: [],
      gifts: [],
      editing: null,
      findRec: null,
      findGift: null,
      findName: "",
      findTitle: "",
    }
  },
  computed: {
    recSuggestions() {
      let receivers = this.persons.filter(person => person.name.toLowerCase().startsWith(this.findName.toLowerCase()));
      return receivers.sort((a, b) => a.name > b.name);
    },
    giftSuggestions() {
      let gifts = this.gifts.filter(gift => gift.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return gifts.sort((a, b) => a.title > b.title);
    },
  },
  created() {
    this.getEntries();
    this.getPersons();
    this.getGifts();
  },
  methods: {
    async getEntries() {
      try {
        let response = await axios.get("/api/entries");
        this.entries = response.data;
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
    async getPersons() {
      try {
        let response = await axios.get("/api/persons");
        this.persons = response.data;
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
    async getGifts() {
      try {
        let response = await axios.get("/api/gifts");
        this.gifts = response.data;
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
    selectRec(rec) {
      this.findRec = rec;
      this.findName = this.findRec.name;
    },
    selectGift(gift) {
      this.findGift = gift;
      this.findTitle = this.findGift.title;
    },
    async addEntry() {
      try {
        await axios.post('/api/entries', {
          receiver: this.findRec,
          gift: this.findGift,
          editDisplay: false,
        });
        this.findRec = null;
        this.findGift = null;
        this.findName = "";
        this.findTitle = "";
        this.getEntries();
      } catch (error) {
        //console.log(error);
      }
    },
    async deleteEntry(entry) {
      try {
        await axios.delete("/api/entries/" + entry._id);
        this.getEntries();
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
    async toggleEdit(entry) {
      await axios.put("/api/entries/" + entry._id, {
          receiver: entry.receiver,
          gift: entry.gift,
          editDisplay: true,
      });
      this.editing = entry;
      this.getEntries();
    },
    async editEntry(entry) {
      try {
        await axios.put("/api/entries/" + entry._id, {
          receiver: this.findRec,
          gift: this.findGift,
          editDisplay: false,
        });
        this.findRec = null;
        this.findGift = null;
        this.findName = "";
        this.findTitle = "";
        this.getEntries();
        return true;
      } catch (error) {
        //console.log(error);
      }
    },
  },
}
</script>

<style scoped>
.list {
  font-family: 'Montserrat', sans-serif;
}
.my-list {
  font-size: 32px;
  margin-bottom: 40px;
}
hr {
  border: 1px solid #FDEB88;
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
.entry-display {
  display: flex;
  justify-content: center;
  align-items: center;
}
.entry-display hr {
  border: .5px dotted #6BB462;
  background-color: #6BB462;
  flex-grow: 1;
  height: .5px;
  width: 80px;
}
.receiver, .gifts {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 50px;
  margin-right: 50px;
}
.display h2 {
  font-size: 26px;
  margin-bottom: 10;
  margin-left: 8px;
}
.display h3 {
  font-size: 16px;
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
  font-size: 14px;
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
  margin-left: 450px;
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
  margin: 45px 0px 25px 445px;
}
.add-entry, .edit-entry {
  display: flex;
  justify-content: space-between;
  margin-left: 110px;
  margin-right: 80px;
}
.add {
  margin-right: 50px;
}
.form-line {
  margin-bottom: 20px;
  margin-left: 20px;
}
.add input {
  margin-right: 10px;
}
.add button {
  margin-top: 25px;
  margin-left: 500px;
  background-color: #FCF97F;
}
.edit button {
  margin-top: 25px;
  margin-left: 500px;
  background-color: #6BAC6A;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
  margin-right: 25px;
}
.suggestion {
  min-height: 20px;
  margin-left: 20px;
}
.suggestion:hover {
  background-color: #6BB462;
  color: #fff;
}
</style>
