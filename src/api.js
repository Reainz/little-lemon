// Seeded random number generator for consistent available times
const seededRandom = function (seed) {
  var m = 2**35 - 31;
  var a = 185852;
  var s = seed % m;
  return function () {
    return (s = s * a % m) / m;
  };
}

// Fetch available booking times for a given date
export const fetchAPI = function(date) {
  let result = [];
  let random = seededRandom(date.getDate());

  for(let i = 17; i <= 23; i++) {
    if(random() < 0.5) {
      result.push(i + ':00');
    }
    if(random() < 0.5) {
      result.push(i + ':30');
    }
  }
  return result;
};

// Submit booking data to API
export const submitAPI = function(formData) {
  // Simulate API call with random success/failure
  return Math.random() > 0.1; // 90% success rate
}; 