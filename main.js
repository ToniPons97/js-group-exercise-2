/**Function to clear terminal when called. */
const clear = () => {
  process.stdout.write("\x1Bc");
};
//extract data
const extractData = obj => {
  return new Promise((resolve, reject) => resolve(obj.data));
};

//sort data
const sortData = arr => {
  return new Promise((resolve, reject) => {
    resolve(arr.sort((a, b) => a - b));
  });
};

//total sum
const totalSum = arr => {
  return new Promise((resolve, reject) => {
    resolve(arr.reduce((prev, curr) => prev + curr, 0));
  });
};

//check if it's even
const isEven = el => new Promise((res, rej) => res(el % 2 === 0));

class Data {
  static process = async jsonStr => {
    const jsObj = JSON.parse(jsonStr);
    //console.log(jsObj, typeof jsObj);

    const extractedData = await extractData(jsObj);
    //console.log(extractedData);
  
    const sortedData = await sortData(extractedData);
    //console.log(sortedData);
  
    const sumTotal = await totalSum(sortedData);
    //console.log(sumTotal);
  
    const isItEven = await isEven(sumTotal);
    //console.log(isItEven);

    return new Promise((res, rej) => res(isItEven));
  }
  
  static extractEvenNums = async arr => 
  new Promise((res, rej) => res(arr.filter(el => el % 2 === 0)));

  static extractOddNums = async arr => 
    new Promise((res, rej) => res(arr.filter(el => el % 2 !== 0)));

  static getBiggestArr = async (arr1, arr2) => 
    totalSum(arr1) >= totalSum(arr2) ? arr1 : arr2;
}

//all above in one
const pipeline = async jsonStr => {
  const jsObj = JSON.parse(jsonStr);
  //console.log(jsObj, typeof jsObj);

  const extractedData = await extractData(jsObj);
  //console.log(extractedData);

  const sortedData = await sortData(extractedData);
  //console.log(sortedData);

  const sumTotal = await totalSum(sortedData);
  //console.log(sumTotal);

  const isItEven = await isEven(sumTotal);
  //console.log(isItEven);

  return new Promise((res, rej) => res(isItEven));
};


clear();

const sourceJSON = `{"data":[10,45,81,90,82,6,29,31,22,5,99,27,55,68,17,88,14,47,50,67]}`;

//const result = await pipeline(sourceJSON);
const result = await Data.process(sourceJSON);
//console.log(result);

const extractedData = await extractData(JSON.parse(sourceJSON));

const evenNumsArr = await Data.extractEvenNums(extractedData);
console.log('even:', evenNumsArr);

const oddNumsArr = await Data.extractOddNums(extractedData);
console.log('odd:', oddNumsArr);

const biggestArr = await Data.getBiggestArr(evenNumsArr, oddNumsArr);
console.log('biggest:', biggestArr);