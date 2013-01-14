function haveBreakfast(food, drink, callback) {
  console.log('Having breakfest of ' + food + ', ' + drink);
  if (callback && typeof(callback) === "function") {
    callback();
  }
}

haveBreakfast('toast', 'coffee', function() {
  console.log('Finished breakfest. Time to go to work!');
});