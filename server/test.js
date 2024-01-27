// // var foundUser = null; // or undefined

// // var id = foundUser?._id;
// // console.log(id); 
// // const timed = new Date()
// // const time = Date.now()
// // const timeInTenMinutes = Date.now() + 30 * 60 * 1000
// // console.log(time, timed, timeInTenMinutes)
// // console.log(30 * 60 * 1000)
// // //This line is checking if foundUser is defined (i.e., not null or undefined). If foundUser is defined, it then accesses the _id property of foundUser. If foundUser is not defined, the expression will return undefined without throwing an error.
// const array = [{star : 5.8, id : 1}, {star : 7.6, id : 2}, {star : 7, id : 3}, ]
// let totalRating = array.length
// // let ratingSum = array.map((item) => item.star)
// //         .reduce((prev, curr) => prev + curr , 0);
// // let actualRating = Math.round(ratingSum / totalRating)
// // const arr = [1, 2,3, 4, 5.5]
// // let addition = 0
// // for(i = 0; i < arr.length; i++){ 
// // addition = addition + arr[i]
// // }
// let starArray = array.map((item) => item.star)
// console.log(starArray)
// let counter = 0
// for(i = 0; i < starArray.length; i++){ 
// counter = counter + starArray[i]
//  }
// let actualRatings = Math.round( counter / totalRating)
// console.log(actualRatings)

// let date = new Date()
// console.log(date)
// console.log
// console.log(date.getDate())
// console.log(date.getHours())
// console.log(date.getTime())
// console.log(date.getUTCHours())
// const files = [1, 2,3 ,4, 5, 6,7]
// for ( const file of files){
//     console.log(file)
// }
// const users = ["A", "B", "C", "D"]
// async function getUser(userId) {
//     try {
//     const response = await users[userId]
//     return response;
//     } catch (error) {
//     console.error('Error fetching user:', error.message);
//     }
//    }
//    // Usage:
//    getUser(3)
//     .then(user => console.log(user))
//     .catch(err => console.error(err));
//     const fs = require("fs")
//     const hu = (a, b) => {
//         return a + b
//     }
//     console.timeEnd(hu(2, 2))
//     console.timeLog(hu(2,2))
// const cartTotal = 1600
// let gideon = (cartTotal - (cartTotal * 30) / 100).toFixed(3)
// console.log(gideon)
// const { v4: uuidv4 } = require('uuid');
// console.log(uuidv4())
// var uniqid = require('uniqid'); 

// console.log(uniqid());
const array = [1, 2,3, 4, 5]
const map = array.map((item) => {
    return item
})
console.log(map)