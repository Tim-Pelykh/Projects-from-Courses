const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitDB", { useNewUrlParser: true});

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    raiting: {
        type: Number,
        min: 1,
        max: 10
    },
    review: {
        type: String
    }
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const pineapple = new Fruit({
    name: "Pineapple",
    raiting: 7,
    review: "Nice Pineapple"
});

 // pineapple.save();

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
    name: "Amy",
    age: 12,
    favouriteFruit: pineapple
});

// person.save();

/* Fruit.insertMany([kiwi, orange], function(err){
    if (err) {
        console.log(err);
    } else {
        console.log("Success");
    }
}); */

// Fruit.find(function(err, fruits){
//     if (err) {
//         console.log(err);
//     } else {
//         fruits.forEach(fruit => {
//             console.log(fruit.name);
//         });
//     } 
// });

// Fruit.updateOne({_id: "624d8bb93c06f3c278d7beca"}, {name: "Grape"}, function(err){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully Updated");
//     }
// });

// Fruit.deleteOne({_id: "625289ade405ae633aadcc59"}, function(err){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully deleted.");
//     }
// })

// Person.deleteMany({name: "John"}, function(err){
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully Deleted");
//     }
// });