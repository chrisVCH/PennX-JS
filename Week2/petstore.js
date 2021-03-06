
/**
 * This function should calculate the total amount of pet food that should be
 * ordered for the upcoming week.
 * @param numAnimals the number of animals in the store
 * @param avgFood the average amount of food (in kilograms) eaten by the animals
 * 				each week
 * @return the total amount of pet food that should be ordered for the upcoming
 * 				 week, or -1 if the numAnimals or avgFood are less than 0 or non-numeric
 */
function calculateFoodOrder(numAnimals, avgFood) {

    // input to numbers
    var numAnimalsN = Number(numAnimals);
    var avgFoodN = Number(avgFood);

    // validate input
    if (isNaN(numAnimalsN) || isNaN(avgFoodN)) {
      return -1;
    } else if ((numAnimalsN < 0) || (avgFoodN < 0)){
      return -1;
    }

    // calculate
    return numAnimalsN * avgFoodN;
}

/**
 * Determines which day of the week had the most nnumber of people visiting the
 * pet store. If more than one day of the week has the same, highest amount of
 * traffic, an array containing the days (in any order) should be returned.
 * (ex. ["Wednesday", "Thursday"]). If the input is null or an empty array, the function
 * should return null.
 * @param week an array of Weekday objects
 * @return a string containing the name of the most popular day of the week if there is only one most popular day, and an array of the strings containing the names of the most popular days if there are more than one that are most popular
 */
function mostPopularDays(week) {

    // validate input
    if (week === null || week.length === 0) {
      return null;
    }
    // get highest traffic
    var highestTraffic = 0;
    week.forEach(function(day) {
      if (day.traffic > highestTraffic) {
        highestTraffic = day.traffic;
      }
    });
    // filter array with highest traffic value
    var resultWeekdays = week.filter(function(day) {
      if (day.traffic === highestTraffic) {
        return true;
      } else {
        return false;
      }
    });
    var resultDays = resultWeekdays.map(function(day) {
      return day.name;
    });
    // return single day or array of days
    if (resultDays.length === 1) {
      return resultDays[0];
    } else {
      return resultDays;
    }

}


/**
 * Given three arrays of equal length containing information about a list of
 * animals - where names[i], types[i], and breeds[i] all relate to a single
 * animal - return an array of Animal objects constructed from the provided
 * info.
 * @param names the array of animal names
 * @param types the array of animal types (ex. "Dog", "Cat", "Bird")
 * @param breeds the array of animal breeds
 * @return an array of Animal objects containing the animals' information, or an
 *         empty array if the array's lengths are unequal or zero, or if any array is null.
 */
function createAnimalObjects(names, types, breeds) {
    // IMPLEMENT THIS FUNCTION!

    // validate input
    var results = [];
    if (names === null || types === null || breeds === null) {
      return results;
    }
    var infoLength = names.length;
    if (infoLength === 0 || infoLength !== types.length || infoLength !== breeds.length) {
      return results;
    }

    // add info to single array of Animal objects
    for (var i = 0; i < infoLength; i++) {
      var animal = new Animal(names[i], types[i], breeds[i]);
      results.push(animal);
    }
    return results;
}

/////////////////////////////////////////////////////////////////
//
//  Do not change any code below here!
//
/////////////////////////////////////////////////////////////////


/**
 * A prototype to create Weekday objects
 */
function Weekday (name, traffic) {
    this.name = name;
    this.traffic = traffic;
}

/**
 * A prototype to create Item objects
 */
function Item (name, barcode, sellingPrice, buyingPrice) {
     this.name = name;
     this.barcode = barcode;
     this.sellingPrice = sellingPrice;
     this.buyingPrice = buyingPrice;
}
 /**
  * A prototype to create Animal objects
  */
function Animal (name, type, breed) {
    this.name = name;
     this.type = type;
     this.breed = breed;
}


/**
 * Use this function to test whether you are able to run JavaScript
 * from your browser's console.
 */
function helloworld() {
    return 'hello world!';
}
