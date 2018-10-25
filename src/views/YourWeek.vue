<template>
  <div class="your-week py-4">
    <h1>Select your boxes for week 69</h1>
    <div class="justify-content-center d-flex">
      <b-tabs v-if="!loading">
        <b-tab title="Monday" active>
          <food-selector :recipes="recipes" day="monday" @meal-updated="changeMeal($event)" />
        </b-tab>
        <b-tab title="Tuesday" >
          <food-selector :recipes="recipes" day="tuesday" @meal-updated="changeMeal($event)" />
        </b-tab>
        <b-tab title="Wednesday">
          <food-selector :recipes="recipes" day="wednesday" @meal-updated="changeMeal($event)" />
        </b-tab>
        <b-tab title="Thursday">
          <food-selector :recipes="recipes" day="thursday" @meal-updated="changeMeal($event)" />
        </b-tab>
        <b-tab title="Friday">
          <food-selector :recipes="recipes" day="friday" @meal-updated="changeMeal($event)" />
        </b-tab>
        <b-tab title="Saturday">
          <food-selector :recipes="recipes" day="saturday" @meal-updated="changeMeal($event)" />
        </b-tab>
        <b-tab title="Sunday">
          <food-selector :recipes="recipes" day="sunday" @meal-updated="changeMeal($event)" />
        </b-tab>
      </b-tabs>
    </div>
    <button class="btn btn-primary" @click="saveWeek">Save</button>
  </div>
</template>

<script>
import FoodSelector from '@/components/FoodSelector.vue';
import { firebase } from '@/firebase';

export default {
  components: {
    FoodSelector,
  },
  data() {
    return {
      recipesData: [],
      loading: true,
      monday: {},
      tuesday: {},
      wednesday: {},
      thursday: {},
      friday: {},
      saturday: {},
      sunday: {},
    };
  },
  computed: {
    recipes() {
      if (this.recipesData.hits.length > 0) {
        return this.recipesData.hits.flatMap(hit => hit.recipe);
      }
      return [];
    }
  },
  mounted() {
    if (this.$store.state.token === '') {
      this.$router.push('/');
    }
  },
  created() {
    const self = this;
    fetch('https://api.edamam.com/search?q=salad&to=25&app_id=f4e020d2&app_key=7ce6d4161954920a4915a222b40d8c67', {
      mode: 'cors',
      header: {
        'Access-Control-Allow-Origin':'*',
      }
    })
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status);
            return;
          }
          response.json().then(function(data) {
            self.recipesData = data;
            self.loading = false;
          });
        }
      )
      .catch(function(err) {
        console.log('Fetch Error:', err);
      });
  },
  methods: {
    async saveWeek() {
      const userId = firebase.auth().currentUser.uid;
      await firebase.database().ref(`users/${userId}/weeks/69`).set({
        monday: this.monday,
        tuesday: this.tuesday,
        wednesday: this.wednesday,
        thursday: this.thursday,
        friday: this.friday,
        saturday: this.saturday,
        sunday: this.sunday
      });
      alert('Your week has been saved!');
    },
    changeMeal({ day, mealNumber, meal}) {
      this[day][mealNumber] = meal;
    }
  }
}
</script>
