<template>
  <div>
    <form @submit.prevent="updateProfile">
      <div class="mb-3">
        <label for="name">Name:</label>
        <input class="form-control" type="text" v-model="editable.name" />
      </div>
      <div class="mb-3">
        <label for="name">Picture:</label>
        <input class="form-control" type="text" v-model="editable.picture" />
      </div>

      <button type="button" class="btn btn-info" @click="addPhone">Add Phone</button>
      <div class="d-flex align-items-center" v-for="(phone, i) in editable.phones" :key="phone.id">
        <div class="mr-2">
          <label for="name">Number:</label>
          <input class="form-control" type="text" v-model="phone.number" />
        </div>
        <div>
          <label for="name">Type:</label>
          <select class="form-control" v-model="phone.type">
            <option v-for="type in phoneTypes" :key="type">{{type}}</option>
          </select>
        </div>
        <div @click="removePhone(i)">
          <i class="fa fa-fw fa-trash text-danger"></i>
        </div>
      </div>

      <div class="my-3">
        <button class="btn btn-success btn-block">Update Profile</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Profile",
  computed: {
    profile() {
      return this.$store.state.profile;
    }
  },
  data() {
    return {
      editable: {},
      phoneTypes: ["cell", "home", "work"]
    };
  },
  watch: {
    profile: {
      handler(val) {
        this.editable = JSON.parse(JSON.stringify(val));
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    updateProfile() {
      this.$store.dispatch("updateProfile", this.editable);
    },
    addPhone() {
      this.editable.phones.push({
        number: "",
        type: "cell"
      });
    },
    removePhone(i) {
      this.editable.phones.splice(i, 1);
    }
  }
};
</script>

<style>
</style>