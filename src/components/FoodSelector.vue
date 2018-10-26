<template>
  <div class="single-day-food-selector">
    <div class="meal-selector my-4">
      <b-card title="Breakfast">
        <v-select :options="recipes" v-model="selected.one" label="label" @input="updateMeal($event, 'one')">
          <template slot="option" slot-scope="option">
            <img :src="option.image" :alt="option.label" height="100px" width="auto">
            <span class="ml-4">{{ option.label }}</span>
          </template>
        </v-select>
      </b-card>
    </div>
    <div class="meal-selector my-4">
      <b-card title="Brunch">
        <v-select :options="recipes" v-model="selected.two" label="label" @input="updateMeal($event, 'two')">
          <template slot="option" slot-scope="option">
            <img :src="option.image" :alt="option.label" height="100px" width="auto">
            <span class="ml-4">{{ option.label }}</span>
          </template>
        </v-select>
      </b-card>
    </div>
    <div class="meal-selector my-4">
      <b-card title="Lunch">
        <v-select :options="recipes" v-model="selected.three" label="label" @input="updateMeal($event, 'three')">
          <template slot="option" slot-scope="option">
            <img :src="option.image" :alt="option.label" height="100px" width="auto">
            <span class="ml-4">{{ option.label }}</span>
          </template>
        </v-select>
      </b-card>
    </div>
    <div class="meal-selector my-4">
      <b-card title="Dinner">
        <v-select :options="recipes" v-model="selected.four" label="label" @input="updateMeal($event, 'four')">
          <template slot="option" slot-scope="option">
            <img :src="option.image" :alt="option.label" height="100px" width="auto">
            <span class="ml-4">{{ option.label }}</span>
          </template>
        </v-select>
      </b-card>
    </div>
    <div class="meal-selector my-4">
      <b-card title="Supper">
        <v-select :options="recipes" v-model="selected.five" label="label" @input="updateMeal($event, 'five')">
          <template slot="option" slot-scope="option">
            <img :src="option.image" :alt="option.label" height="100px" width="auto">
            <span class="ml-4">{{ option.label }}</span>
          </template>
        </v-select>
      </b-card>
    </div>
    <div :class="{ 'too-much': caloriesInMeals > maxCalories }" class="calorie-counter align-items-center justify-content-center mb-2">
      <span>Calories: {{ caloriesInMeals }}/{{ maxCalories }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    day: {
      type: String,
      required: true,
    },
    recipes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selected: {
        one: {},
        two: {},
        three: {},
        four: {},
        five: {}
      },
      maxCalories: 2500
    };
  },
  computed: {
    caloriesInMeals() {
      return (typeof this.selected.one.calories !== 'undefined' ? this.selected.one.calories : 0)
        + (typeof this.selected.two.calories !== 'undefined' ? this.selected.two.calories : 0)
        + (typeof this.selected.three.calories !== 'undefined' ? this.selected.three.calories : 0)
        + (typeof this.selected.four.calories !== 'undefined' ? this.selected.four.calories : 0)
        + (typeof this.selected.five.calories !== 'undefined' ? this.selected.five.calories : 0);
    }
  },
  methods: {
    updateMeal(meal, mealNumber) {
      this.$emit('meal-updated', {
        day: this.day,
        mealNumber,
        meal
      });
      if (meal === null) {
        meal = {};
      }
      this.selected[mealNumber] = meal;
    }
  }
}
</script>

<style lang="scss">
.dropdown-toggle:after {
  display: none;
}

.calorie-counter {
  height: 50px;
  display: flex;
}

.too-much {
  background: red;
  color: white
}
</style>