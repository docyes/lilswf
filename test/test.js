test("gt test", function() {
	// Make privates public for unit tests
    // Expose privates for testing.
    lilswf.enableTest()
	
    //arguments to array casting
    var args = lilswf.argumentsToArray(1, 2, 3);
    equals(args instanceof Array, true)

    //convert an array of values to a string
    //simple number array
    var csv = lilswf.arrayToCSV([1, 2, 3])
    equals(csv, '1,2,3')
    //simple string array
    var csv = lilswf.arrayToCSV(['1', '2', '3'])
    equals(csv, '1,2,3')
    //simple mixed array of values
    var csv = lilswf.arrayToCSV([1, '2', 3])
    equals(csv, '1,2,3')
    
    //retrieve number groups from a string
    //simple string with no padding
    var numberGroups = lilswf.numberGroupsFromString('1,2,3');
    equals(numberGroups.toString(), '1,2,3')
    //simple string with padding
    var numberGroups = lilswf.numberGroupsFromString(' 1,2 , 3 ');
    equals(numberGroups.toString(), '1,2,3')
    //complex string with no padding
    var numberGroups = lilswf.numberGroupsFromString('a1,2b,c3d');
    equals(numberGroups.toString(), '1,2,3')
    //complex string with padding
    var numberGroups = lilswf.numberGroupsFromString(' a1,2b , c3d ');
    equals(numberGroups.toString(), '1,2,3')

    //convert an array of numerical values to number
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
    
    //arguments to normalized number parser
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
    
    //test greater than comparison
    version = 100020003;
    //equal length number comparison
    equals(lilswf.compare(100020004, ">", version), true)
    equals(lilswf.compare(100020003, ">", version), false)
    equals(lilswf.compare(100020002, ">", version), false)
    //unequal length number comparison
    equals(lilswf.compare(10003, ">", version), true)
    equals(lilswf.compare(10002, ">", version), false)
    equals(lilswf.compare(10001, ">", version), false)
    
    //equal length number comparison
    equals(lilswf.compare(100020004, ">=", version), true)
    equals(lilswf.compare(100020003, ">=", version), true)
    equals(lilswf.compare(100020002, ">=", version), false)
    //unequal length number comparison
    equals(lilswf.compare(10003, ">=", version), true)
    equals(lilswf.compare(10002, ">=", version), true)
    equals(lilswf.compare(10001, ">=", version), false)
    
    //equal length number comparison
    equals(lilswf.compare(100020004, "<", version), false)
    equals(lilswf.compare(100020003, "<", version), false)
    equals(lilswf.compare(100020002, "<", version), true)
    //unequal length number comparison
    equals(lilswf.compare(10003, "<", version), false)
    equals(lilswf.compare(10002, "<", version), false)
    equals(lilswf.compare(10001, "<", version), true)
    
    //equal length number comparison
    equals(lilswf.compare(100020004, "<=", version), false)
    equals(lilswf.compare(100020003, "<=", version), true)
    equals(lilswf.compare(100020002, "<=", version), true)
    //unequal length number comparison
    equals(lilswf.compare(10003, "<=", version), false)
    equals(lilswf.compare(10002, "<=", version), true)
    equals(lilswf.compare(10001, "<=", version), true)
    
    //equal length number comparison
    equals(lilswf.compare(100020004, "==", version), false)
    equals(lilswf.compare(100020003, "==", version), true)
    equals(lilswf.compare(100020002, "==", version), false)
    //unequal length number comparison
    equals(lilswf.compare(10003, "==", version), false)
    equals(lilswf.compare(10002, "==", version), true)
    equals(lilswf.compare(10001, "==", version), false)    

});