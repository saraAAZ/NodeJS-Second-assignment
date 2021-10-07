const express = require("express");

const app = express();

app.use(express.json());

const users = [
    {
        id: 1,
        isActive: true,
        balance: "$1,111.15",
        picture: "http://placehold.it/32x32",
        age: 37,
        name: "Elsa Castaneda",
        gender: "female",
        company: "OTHERWAY",
        email: "elsacastaneda@otherway.com",
        phone: "+1 (988) 404-2932"
    }, {
        id: 2,
        isActive: true,
        balance: "$1,823.59",
        picture: "http://placehold.it/32x32",
        age: 35,
        name: "Ollie Osborn",
        gender: "female",
        company: "VIASIA",
        email: "ollieosborn@viasia.com",
        phone: "+1 (947) 442-2611"
    }, {
        id: 3,
        isActive: true,
        balance: "$1,734.78",
        picture: "http://placehold.it/32x32",
        age: 29,
        name: "Dean Huff",
        gender: "male",
        company: "NORALEX",

        email: "deanhuff@noralex.com",
        phone: "+1 (816) 575-2363"
    },
];
const children = [
    {
        id: 11,
        name: "Christina Bray",
        parent_id: 1,
        age: 6
    },
    {
        id: 12,
        name: "Farrell Boone",
        parent_id: 1,
        age: 4
    },
    {
        id: 13,
        name: "Gary Maddox",
        parent_id: 2,
        age: 4
    },
    {
        id: 14,
        name: "Helena Burt",
        parent_id: 2,
        age: 6
    }, {
        id: 15,
        name: "Beryl Duke",
        parent_id: 2,
        age: 7
    },
];

// endpoints
app.get("/users", (req, res) => {
    res.json(users);
});
app.get("/children", (req, res) => {
    res.json(children);
});

app.get("/user/:userId", (req, res) => {
    const id = req.params.userId;
    const result = users.find((user) => user.id == id);
    if (result) {
        res.json(result);
    } else {
        res.status(404).json({msg: "Not found!"});
    }
});
app.get("/child/:childId", (req, res) => {
    const id = req.params.childId;
    const result = children.find((child) => child.id == id);
    if (result) {
        res.json(result);
    } else {
        res.status(404).json({msg: "Not found!"});
    }
});
app.get("/users/:userId/children/:childId", (req, res) => {
    const parentId = req.params.userId;
    const childId = req.params.childId;
    const parentResult = users.find((user) => user.id == parentId);
    if (! parentResult) {
        res.status(404).json({msg: "Not found!"});
    } else {
        const result = children.find((child) => (child.id == childId && child.parent_id == parentId));
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({msg: ` User ${parentId} does not have a Child with id ${childId} `});
        }
    }
});
app.post("/users", (req, res) => {
    const body = req.body;
    const userId=require(body.id);
    const isActive=require(body.isActive);
    const balance=body.balance;
 const picture =body.picture;
const age=body.age;
const name=body.age;
const gender =body.gender;
const company=body.company;
const email=body.email;
const phone=body.phone;
    // validation
    // unique id
  
    if (users.find((user) => user.id == userId)) {
      res.status(409).json(`User with ${userId} Already Exists`);
    } else {
      users.push(body);
      res.status(201).json({msg: ` User ${userId} Is added`});
    }
  });
app.delete("/user/:id", (req, res) => {
const id = req.params.id;
const user = users.find((user) => user.id == id);
if (!user) {
    res.status(404).json({
      msg: "User Not Found!",
    });
} else {
    const index = users.indexOf(user);
    users.splice(index, 1);
    res.status(404).json({msg: ` User ${id} Is Deleted`});
    
}
});

app.delete("/child/:id", (req, res) => {
    const id = req.params.id;
    const child = children.find((child) => child.id == id);
    if (!child) {
        res.status(404).json({
          msg: "Child Not Found!",
        });
    } else {
        const index = children.indexOf(child);
        children.splice(index, 1);
        res.status(404).json({msg: ` Child ${id} Is Deleted`});
        
    }
    });
    
app.listen(3000, () => console.log("Server started"));
