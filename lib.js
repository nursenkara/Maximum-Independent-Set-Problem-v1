function IsConnected(data, x, y) {
  return data.split("\n")[--x].trim().split(" ")[--y] == "1";
}

function AllSubsets(data) {
  var len = data.trim().split("\n").length + 1;
  var arr = [];
  var strNum = "";
  for (var i = 1; i < len; i++) {
    strNum += "1";
  }
  var num = parseInt(strNum, 2);
  for (var i = 0; i <= num; i++) {
    // i sayısı decimalden binary'e ve string'e dönüştürüldü.
    var bnry = i.toString(2);

    // String'in soluna "graph-example-1.txt" dosyasındaki satırlar kdar "0" koyuldu.
    var paddedBnry = bnry.padStart(len - 1, 0);

    // Tüm karakterler diziye dönüştürüldü.
    var item = paddedBnry.split("");

    arr.push(item);
  }
  return arr;
}

function ValidS(data, s) {
  for (var i = 0; i < s.length; i++) {
    if (s[i] == 1 && s[i + 1] == 1) {
      // Index koordinata dönüştürüldü.
      var x = i + 1;
      var y = i + 2;
      if (IsConnected(data, x, y)) {
        return false;
      }
    }
  }
  return true;
}

function AllValidSubsets(data) {
  var valids = [];
  var all = AllSubsets(data); // 00000000 - 11111111
  for (var i = 0; i < all.length; i++) {
    var current = all[i];
    if (ValidS(data, current)) {
      var str = current.join(",");
      valids.push(`{${str}}`);
    }
  }
  return valids;
}

function GenerateMaxS(data) {
  var ret = [];
  var total = 0;
  var allValids = AllValidSubsets(data);
  for (var i = 0; i < allValids.length; i++) {
    var currentSum = 0;
    var validSubSet = allValids[i].replace("{", "").replace("}", "").split(",");

    validSubSet.map((x) => (x == 1 ? currentSum++ : 0));
    // for(var x in validSubSet){
    //   if(validSubSet[x] == 1){
    //     currentSum = currentSum + 1;
    //   }else{
    //     0;
    //   }
    // }

    if (total < currentSum) {
      total = currentSum;
      ret = validSubSet;
    }
  }
  return ret;
}

function MaximumSolution(data) {
  var s = GenerateMaxS(data);
  var joinedS = s.join(",");
  var f = 0;
  s.map((i) => (i == 1 ? f++ : 0));
  return `S = {${joinedS}}   f(S) = ${f}`;
}

function Krosover(data, num, retType) {
  // retType == 1 // String
  // retType == 2 // ValidArray
  var strArr = [];
  var valids = [];
  var all = AllSubsets(data); // 00000000 - 11111111
  for (var i = 0; i < all.length - 1; i++) {
    var a = all[i];
    var b = all[i + 1];
    var current = [];
    for (var x = 0; x < num; x++) {
      current[x] = a[x];
    }
    for (var x = num; x < b.length; x++) {
      current[x] = b[x];
    }
    if (ValidS(data, current)) {
      var str = current.join(",");
      valids.push(`{${str}}`);
    }
    strArr.push(
      `sA: ${a} - sB: ${b} - S: ${current} - IsValidS: ${ValidS(data, current)}`
    );
  }
  return retType == 1 ? strArr.join("\n") : valids;
}

function Mutation(data, num, retType) {
  // retType == 1 // String
  // retType == 2 // ValidArray
  num = num - 1; // num - 1 ile index'e dönüştürüldü.
  var strArr = [];
  var valids = [];
  var all = AllSubsets(data); // 00000000 - 11111111
  var oldS = "";
  for (var i = 0; i < all.length - 1; i++) {
    oldS = all[i].toString();
    var current = all[i];
    current[num] = current[num] == 1 ? 0 : 1;
    if (ValidS(data, current)) {
      var str = current.join(",");
      valids.push(`{${str}}`);
    }
    strArr.push(
      `oldS: ${oldS} - S: ${current} - IsValidS: ${ValidS(data, current)}`
    );
  }
  return retType == 1 ? strArr.join("\n") : valids;
}

module.exports = {
  AllValidSubsets: AllValidSubsets,
  GenerateMaxS: GenerateMaxS,
  MaximumSolution: MaximumSolution,
  Krosover: Krosover,
  Mutation: Mutation,
};
