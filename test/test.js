// Expose privates for testing.
var version = 100020003;
lilswf.enableTest(version);

test("convert an array of numerical values to number", function() {
  //array of numbers as strings to a significance of 1
  equals(lilswf.arrayOfNumbersToInt(['1','2','3'], 1), 123)
  //array of numbers to a significance of 1
  equals(lilswf.arrayOfNumbersToInt([1,2,3], 1), 123)
  //array of numbers as strings to a significance of 4
  equals(lilswf.arrayOfNumbersToInt(['1','2','3'], 4), 100020003)
  //array of numbers to a significance of 4
  equals(lilswf.arrayOfNumbersToInt([1,2,3], 4), 100020003)
  
  //array of numbers as strings to a significance of 1 with a length of 2
  equals(lilswf.arrayOfNumbersToInt(['1','2','3'], 1, {length:2}), 12)
  //array of numbers to a significance of 1 with a length of 2
  equals(lilswf.arrayOfNumbersToInt([1,2,3], 1, {length:2}), 12)
  //array of numbers as strings to a significance of 4 with a length of 2
  equals(lilswf.arrayOfNumbersToInt(['1','2','3'], 4, {length:2}), 10002)
  //array of numbers to a significance of 4 with a length of 2
  equals(lilswf.arrayOfNumbersToInt([1,2,3], 4, {length:2}), 10002)
});

test("arguments to normalized number parser", function() {
  //simple string with no padding
  var number = lilswf.argumentsToNumber('1,2,3');
  equals(number, 100020003)
  //simple string with padding
  var number = lilswf.argumentsToNumber(' 1,2 , 3 ');
  equals(number, 100020003)
  //complex string with no padding
  var number = lilswf.argumentsToNumber('a1,2b,c3d');
  equals(number, 100020003)
  //complex string with padding
  var number = lilswf.argumentsToNumber(' a1,2b , c3d ');
  equals(number, 100020003)  
});

test("greater than comparison", function() {
  //equal length number comparison
  equals(lilswf.compare(100020004, ">", version), true)
  equals(lilswf.compare(100020003, ">", version), false)
  equals(lilswf.compare(100020002, ">", version), false)
  //unequal length number comparison
  equals(lilswf.compare(10003, ">", version), true)
  equals(lilswf.compare(10002, ">", version), false)
  equals(lilswf.compare(10001, ">", version), false)  
});

test("greater than or equal comparison", function() {
  //equal length number comparison
  equals(lilswf.compare(100020004, ">=", version), true)
  equals(lilswf.compare(100020003, ">=", version), true)
  equals(lilswf.compare(100020002, ">=", version), false)
  //unequal length number comparison
  equals(lilswf.compare(10003, ">=", version), true)
  equals(lilswf.compare(10002, ">=", version), true)
  equals(lilswf.compare(10001, ">=", version), false)  
});

test("less than comparison", function() {
  //equal length number comparison
  equals(lilswf.compare(100020004, "<", version), false)
  equals(lilswf.compare(100020003, "<", version), false)
  equals(lilswf.compare(100020002, "<", version), true)
  //unequal length number comparison
  equals(lilswf.compare(10003, "<", version), false)
  equals(lilswf.compare(10002, "<", version), false)
  equals(lilswf.compare(10001, "<", version), true)  
});

test("less than or equal comparison", function() {
  //equal length number comparison
  equals(lilswf.compare(100020004, "<=", version), false)
  equals(lilswf.compare(100020003, "<=", version), true)
  equals(lilswf.compare(100020002, "<=", version), true)
  //unequal length number comparison
  equals(lilswf.compare(10003, "<=", version), false)
  equals(lilswf.compare(10002, "<=", version), true)
  equals(lilswf.compare(10001, "<=", version), true)  
});

test("equality comparison", function() {
  //equal length number comparison
  equals(lilswf.compare(100020004, "==", version), false)
  equals(lilswf.compare(100020003, "==", version), true)
  equals(lilswf.compare(100020002, "==", version), false)
  //unequal length number comparison
  equals(lilswf.compare(10003, "==", version), false)
  equals(lilswf.compare(10002, "==", version), true)
  equals(lilswf.compare(10001, "==", version), false) 
});

test("in a theatre soon", function() {

});