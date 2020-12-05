<template>
<div class="list">
  <h1 class="my-list">My List</h1>
  <div class="display-list" v-for="entry in entries" :key="entry.id"> 
    
    <div class="display" v-if="!entry.editDisplay">  
      <hr>
      <div class="receiver">
        <h3> {{entry.receiver.name}} </h3> 
        <button @click="toggleRView(entry.receiver)" class="veiwR">View Details</button>
      </div>
      <div class="gifts">
        <h3> {{entry.gift.title}} </h3> 
        <button @click="toggleGView(entry.gift)" class="veiwG">View Details</button>
      </div>
      <div class="buttons">
        <button @click="toggleEdit(entry)" class="editB">Edit</button>
        <button @click="deleteEntry(entry)" class="removeB">Remove</button>
      </div>
    </div>
    
    <div class="edit" v-else>
      <hr>
      <div class="edit-entry">
        <input v-model="findName" placeholder="editing.receiver.name">
        <div class="RecSuggestions" v-if="recSuggestions.length > 0">
          <div class="suggestion" v-for="s in recSuggestions" :key="s.id" @click="selectRec(s)">{{s.name}}
          </div>
        </div>
        <input v-model="findTitle" placeholder="editing.receiver.gift">
        <div class="GiftSuggestions" v-if="giftSuggestions.length > 0">
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
      <div class="RecSuggestions" v-if="recSuggestions.length > 0">
        <div class="suggestion" v-for="s in recSuggestions" :key="s.id" @click="selectRec(s)">{{s.name}}
        </div>
      </div>
      <input v-model="findTitle" placeholder="Gift">
      <div class="GiftSuggestions" v-if="giftSuggestions.length > 0">
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
    async getGifts() {
      try {
        let response = await axios.get("/api/gifts");
        this.gifts = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectRec(rec) {
      this.findRec = rec;
      this.findName = findRec.name;
    },
    selectGift(gift) {
      this.findGift = gift;
      this.findTitle = findGift.title;
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
        console.log(error);
      }
    },
    async deleteEntry(entry) {
      try {
        await axios.delete("/api/entries/" + entry._id);
        this.getEntries();
        return true;
      } catch (error) {
        console.log(error);
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
          receiver: this.editing.receiver,
          gift: this.editing.gift,
          editDisplay: false,
        });
        this.getEntries();
        return true;
      } catch (error) {
        console.log(error);
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
  border: 1px solid #FD7A73;
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
  font-size: 22px;
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
