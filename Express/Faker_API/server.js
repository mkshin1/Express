
const faker = require("faker")
const express = require("express")
const app = express()
const mongoose = require('mongoose')

app.use(express.json())

// app.get("/", (req,res) => res.send("hello world x2"))

let users = [
    { firstName: "Reimu",  lastName: "Hakurei"    },
]

app.get('/', (request, response) => {
    console.log(request);
    // response.send('Hello!');
    response.json({
      hello: 'world',
      hello2: 'world2'
    });
  });
  
  // handle a post request
app.post('/', (req, res) => {
    console.log(req.body); // trying to see the incoming data
    res.json({
      posted: true
    });
  });

app.put("/:id", (req, res) => {
    // console.log(req.body)
    const id = req.param.id
    users = req.body
    res.json({status: "ok"})

})

app.delete("/:id", (req, res) => {
    // we can get this `id` variable from req.params
    const id = req.params.id;
    // assuming this id is the index of the users array we can remove the user like so
    users.splice(id, 1);
    // we always need to respond with something
    res.json( { status: "ok" } );
});



class User {
    constructor() {
        this.id = faker.random.number()
        this.firstName = faker.name.firstName()
        this.lastName = faker.name.lastName()
        this.phoneNumber = faker.phone.phoneNumber()
        this.email = faker.internet.email()
        this.password = faker.internet.password()
    }
}
console.log(new User())

// The output of the above console log will look like this 
// { name: 'Generic Plastic Bacon', price: "$568.00", department:"tools"} 
//

class Company {
    constructor() {
        this.id = faker.random.number()
        this.name = faker.company.companyName()
        this.address = faker.address.streetAddress()


        
    }
}
console.log(new Company())

app.get('/api/users/new', (request, response) => {
    console.log(request);
    // response.send('Hello!');
    response.json({
        user : new User()
    });
});


app.get("/api/companies/new", (request, response) => {
    response.json({
        company: new Company()
    })
})

app.get('/api/user/company', (request, response) => {
    response.json({
        user : new User(),
        company: new Company()
    });
});



app.listen(3005, () => console.log("listening in port 3005!"))