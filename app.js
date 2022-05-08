var data = require("fs").readFileSync("./graph-example-1.txt", "utf8");
var lib = require("./lib");

console.log("All Valid Subsets: \n", lib.AllValidSubsets(data));

console.log("Maximum Solution:" + lib.MaximumSolution(data));

// Dışarıdan parametre alıyor, burada örnek olarak 3 verildi.
var forKrosoverParam = 3;
var retType = 1;
console.log("Krosover: \n" + lib.Krosover(data, forKrosoverParam, retType));

// Dışarıdan parametre alıyor, burada örnek olarak 3 verildi.
var forMutationParam = 3;
var retType = 1;
console.log("Mutation: \n" + lib.Mutation(data, forMutationParam, retType));
