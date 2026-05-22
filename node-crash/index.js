// const {generateRandNumb, celciustofahren} = require(`./utils`)

// console.log(`Rand Number : ${generateRandNumb()}`)

// console.log(`CelciustoFahrenheit : ${celciustofahren(0)}`)

import {getPosts} from './postcontroller.js' 

console.log(`Data : ${getPosts()}`)

// the above will return 
// (base) thangaraj@Admins-MacBook-Pro node-crash % node index.js
// Data : [object Object],[object Object],[object Object]


// we need JSON.stringify to solve this array of objects

console.log(`For array of objects : ${JSON.stringify(getPosts())}`)

