const mnemonicMap = JSON.parse(data);
/**
 * search
 * @param {string} keyword 
 */
const search = (keyword) => {
  let result = mnemonicMap.find((element)=>{
    // console.log(element);
    return Object.keys(element)[0] === keyword; 
  });
  if (result === undefined) {
    throw new Error('seed not in dictionary');
  }
  return result[`${keyword}`];
}