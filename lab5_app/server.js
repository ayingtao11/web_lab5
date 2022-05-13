// Learned from the website: https://developerhowto.com/2018/12/29/build-a-rest-api-with-node-js-and-express-js/
// and https://www.freecodecamp.org/news/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0/

// Create express app
var express = require("express")
var app = express()
var db = require("./database.js")
var md5 = require("md5")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Server port
var HTTP_PORT = 5000 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

// Root endpoint
app.get("/", (req, res, next) => {
    var sql = "select * from car_owners"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    });
});

//API endpoints for table car_owners
//get all of the rows and fields from particular table from database.
app.get("/api/car_owners", (req, res, next) => {
    var sql = "select * from car_owners"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});
//get a single row by Car_ID as id from particular table from database.
app.get("/api/car_owners/:id", (req, res, next) => {
    var sql = "select * from car_owners where Car_ID = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"get success",
            "data":row
        })
      });
});
//insert new data from user input into the table.
app.post("/api/car_owners/", (req, res, next) => {
    var errors=[]
    if (!req.body.Car_ID){
        errors.push("No Car_ID specified");
    }
    if (!req.body.Email){
        errors.push("No Email specified");
    }
    if (!req.body.Name){
        errors.push("No Name specified");
    }
    if (!req.body.Year){
        errors.push("No Year specified");
    }
    if (!req.body.Make){
        errors.push("No Make specified");
    }
    if (!req.body.Model){
        errors.push("No Model specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        Car_ID: req.body.Car_ID,
        Email: req.body.Email,
        Name: req.body.Name,
        Year: req.body.Year,
        Make: req.body.Make,
        Model: req.body.Model
    }
    var sql ='INSERT INTO car_owners (Car_ID,Email,Name,Year,Make,Model) VALUES (?,?,?,?,?,?)'
    var params =[data.Car_ID,data.Email,data.Name,data.Year,data.Make,data.Model]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "insert success",
            "data": data,
            "id" : this.lastID
        })
    });
})
//update the new data using Car_ID as id for the table
app.patch("/api/car_owners/:id", (req, res, next) => {
    var data = {
        Car_ID: req.body.Car_ID,
        Email: req.body.Email,
        Name: req.body.Name,
        Year: req.body.Year,
        Make: req.body.Make,
        Model: req.body.Model
    }
    db.run(
        `UPDATE car_owners set 
            Car_ID = COALESCE(?,Car_ID), 
            Email = COALESCE(?,Email), 
            Name = COALESCE(?,Name), 
            Year = COALESCE(?,Year), 
            Make = COALESCE(?,Make), 
            Model = COALESCE(?,Model), 
            WHERE id = ?`,
        [data.Car_ID,data.Email,data.Name,data.Year,data.Make,data.Model,req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "update success",
                data: data,
                changes: this.changes
            })
    });
})

//API endpoints for table car_judges
//get all of the rows and fields from particular table from database.
app.get("/api/car_judges", (req, res, next) => {
    var sql = "select * from car_judges"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});
//get a single row by Car_ID as id from particular table from database.
app.get("/api/car_judges/:id", (req, res, next) => {
    var sql = "select * from car_judges where Car_ID = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"get success",
            "data":row
        })
      });
});
//insert new data from user input into the table.
app.post("/api/car_judges/", (req, res, next) => {
    var errors=[]
    if (!req.body.Car_ID){
        errors.push("No Car_ID specified");
    }
    if (!req.body.Judge_ID){
        errors.push("No Judge_ID specified");
    }
    if (!req.body.Judge_Name){
        errors.push("No Judge_Name specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        Car_ID: req.body.Car_ID,
        Judge_ID: req.body.Judge_ID,
        Judge_Name: req.body.Judge_Name,
    }
    var sql ='INSERT INTO car_judges (Car_ID,Judge_ID,Judge_Name) VALUES (?,?,?)'
    var params =[data.Car_ID,data.Judge_ID,data.Judge_Name]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "insert success",
            "data": data,
            "id" : this.lastID
        })
    });
})
//update the new data using Car_ID as id for the table.
app.patch("/api/car_judges/:id", (req, res, next) => {
    var data = {
        Car_ID: req.body.Car_ID,
        Judge_ID: req.body.Judge_ID,
        Name: req.body.Judge_Name
    }
    db.run(
        `UPDATE car_judges set 
            Car_ID = COALESCE(?,Car_ID), 
            Judge_ID = COALESCE(?,Judge_ID), 
            Name = COALESCE(?,Judge_Name), 
            WHERE id = ?`,
        [data.Car_ID,data.Judge_ID,data.Judge_Name,req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "update success",
                data: data,
                changes: this.changes
            })
    });
})

//API endpoints for table car_body_frame
//get all of the rows and fields from particular table from database.
app.get("/api/car_body_frame", (req, res, next) => {
    var sql = "select * from car_body_frame"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});
//get a single row by Car_ID as id from particular table from database.
app.get("/api/car_body_frame/:id", (req, res, next) => {
    var sql = "select * from car_body_frame where Car_ID = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"get success",
            "data":row
        })
      });
});
// insert new data from user input into the table.
app.post("/api/car_body_frame/", (req, res, next) => {
    var errors=[]
    if (!req.body.Car_ID){
        errors.push("No Car_ID specified");
    }
    if (!req.body.Body_Frame_Undercarriage){
        errors.push("No Body_Frame_Undercarriage specified");
    }
    if (!req.body.Body_Frame_Suspension){
        errors.push("No Body_Frame_Suspension specified");
    }
    if (!req.body.Body_Frame_Chrome){
        errors.push("No Body_Frame_Chrome specified");
    }
    if (!req.body.Body_Frame_Detailing){
        errors.push("No Body_Frame_Detailing specified");
    }
    if (!req.body.Body_Frame_Cleanliness){
        errors.push("No Body_Frame_Cleanliness specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        Car_ID: req.body.Car_ID,
        Body_Frame_Undercarriage: req.body.Body_Frame_Undercarriage,
        Body_Frame_Suspension: req.body.Body_Frame_Suspension,
        Body_Frame_Chrome: req.body.Body_Frame_Chrome,
        Body_Frame_Detailing: req.body.Body_Frame_Detailing,
        Body_Frame_Cleanliness: req.body.Body_Frame_Cleanliness
    }
    var sql ='INSERT INTO car_body_frame (Car_ID,Body_Frame_Undercarriage,Body_Frame_Suspension,Body_Frame_Chrome,Body_Frame_Detailing,Body_Frame_Cleanliness) VALUES (?,?,?,?,?,?)'
    var params =[data.Car_ID,data.Body_Frame_Undercarriage,data.Body_Frame_Suspension,
        data.Body_Frame_Chrome,data.Body_Frame_Detailing,data.Body_Frame_Cleanliness]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "insert success",
            "data": data,
            "id" : this.lastID
        })
    });
})
//update the new data using Car_ID as id for the table.
app.patch("/api/car_body_frame/:id", (req, res, next) => {
    var data = {
        Car_ID: req.body.Car_ID,
        Body_Frame_Undercarriage: req.body.Body_Frame_Undercarriage,
        Body_Frame_Suspension: req.body.Body_Frame_Suspension,
        Body_Frame_Chrome: req.body.Body_Frame_Chrome,
        Body_Frame_Detailing: req.body.Body_Frame_Detailing,
        Body_Frame_Cleanliness: req.body.Body_Frame_Cleanliness
    }
    db.run(
        `UPDATE car_body_frame set 
            Car_ID = COALESCE(?,Car_ID),
            Body_Frame_Undercarriage = COALESCE(?,Body_Frame_Undercarriage), 
            Body_Frame_Suspension = COALESCE(?,Body_Frame_Suspension), 
            Body_Frame_Chrome = COALESCE(?,Body_Frame_Chrome), 
            Body_Frame_Detailing = COALESCE(?,Body_Frame_Detailing), 
            Body_Frame_Cleanliness = COALESCE(?,Body_Frame_Cleanliness), 
            WHERE id = ?`,
        [data.Car_ID,data.Body_Frame_Undercarriage,data.Body_Frame_Suspension,
            data.Body_Frame_Chrome,data.Body_Frame_Detailing,data.Body_Frame_Cleanliness
            ,req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "update success",
                data: data,
                changes: this.changes
            })
    });
})

//API endpoints for car_engine
//get all of the rows and fields from particular table from database.
app.get("/api/car_engine", (req, res, next) => {
    var sql = "select * from car_engine"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});
//get a single row by Car_ID as id from particular table from database.
app.get("/api/car_engine/:id", (req, res, next) => {
    var sql = "select * from car_engine where Car_ID = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"get success",
            "data":row
        })
      });
});
//insert new data from user input into the table.
app.post("/api/car_engine/", (req, res, next) => {
    var errors=[]
    if (!req.body.Car_ID){
        errors.push("No Car_ID specified");
    }
    if (!req.body.Engine_Modifications){
        errors.push("No Engine_Modifications specified");
    }
    if (!req.body.Engine_Performance){
        errors.push("No Engine_Performance specified");
    }
    if (!req.body.Engine_Chrome){
        errors.push("No Engine_Chrome specified");
    }
    if (!req.body.Engine_Detailing){
        errors.push("No Engine_Detailing specified");
    }
    if (!req.body.Engine_Cleanliness){
        errors.push("No Engine_Cleanliness specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        Car_ID: req.body.Car_ID,
        Engine_Modifications: req.body.Engine_Modifications,
        Engine_Performance: req.body.Engine_Performance,
        Engine_Chrome: req.body.Engine_Chrome,
        Engine_Detailing: req.body.Engine_Detailing,
        Engine_Cleanliness: req.body.Engine_Cleanliness
    }
    var sql ='INSERT INTO car_engine (Car_ID,Engine_Modifications,Engine_Performance,Engine_Chrome,Engine_Detailing,Engine_Cleanliness) VALUES (?,?,?,?,?,?)'
    var params =[data.Car_ID,data.Engine_Modifications,data.Engine_Performance,
        data.Engine_Chrome,data.Engine_Detailing,data.Engine_Cleanliness]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "insert success",
            "data": data,
            "id" : this.lastID
        })
    });
})
//update the new data using Car_ID as id for the table.
app.patch("/api/car_engine/:id", (req, res, next) => {
    var data = {
        Car_ID: req.body.Car_ID,
        Engine_Modifications: req.body.Engine_Modifications,
        Engine_Performance: req.body.Engine_Performance,
        Engine_Chrome: req.body.Engine_Chrome,
        Engine_Detailing: req.body.Engine_Detailing,
        Engine_Cleanliness: req.body.Engine_Cleanliness
    }
    db.run(
        `UPDATE car_engine set 
            Car_ID = COALESCE(?,Car_ID), 
            Engine_Modifications = COALESCE(?,Engine_Modifications), 
            Engine_Performance = COALESCE(?,Engine_Performance), 
            Engine_Chrome = COALESCE(?,Engine_Chrome), 
            Engine_Detailing = COALESCE(?,Engine_Detailing), 
            Engine_Cleanliness = COALESCE(?,Engine_Cleanliness), 
            WHERE id = ?`,
        [data.Car_ID,data.Engine_Modifications,data.Engine_Performance,
            data.Engine_Chrome,data.Engine_Detailing,data.Engine_Cleanliness,req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "update success",
                data: data,
                changes: this.changes
            })
    });
})

//API endpoints for table car_racer
//get all of the rows and fields from particular table from database.
app.get("/api/car_racer", (req, res, next) => {
    var sql = "select * from car_racer"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});
//get a single row by Car_ID as id from particular table from database.
app.get("/api/car_racer/:id", (req, res, next) => {
    var sql = "select * from car_owners where Car_ID = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"get success",
            "data":row
        })
      });
});
//insert new data from user input into the table.
app.post("/api/car_racer/", (req, res, next) => {
    var errors=[]
    if (!req.body.Car_ID){
        errors.push("No Car_ID specified");
    }
    if (!req.body.Racer_Turbo){
        errors.push("No Racer_Turbo specified");
    }
    if (!req.body.Racer_Supercharged){
        errors.push("No Racer_Supercharged specified");
    }
    if (!req.body.Racer_Performance){
        errors.push("No Racer_Performance specified");
    }
    if (!req.body.Racer_Horsepower){
        errors.push("No Racer_Horsepower specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        Car_ID: req.body.Car_ID,
        Racer_Turbo: req.body.Racer_Turbo,
        Racer_Supercharged: req.body.Racer_Supercharged,
        Racer_Performance: req.body.Racer_Performance,
        Racer_Horsepower: req.body.Racer_Horsepower
    }
    var sql ='INSERT INTO car_racer (Car_ID,Racer_Turbo,Racer_Supercharged,Racer_Performance,Racer_Horsepower) VALUES (?,?,?,?,?)'
    var params =[data.Car_ID,data.Racer_Turbo,data.Racer_Supercharged,data.Racer_Performance,
        data.Racer_Horsepower]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "insert success",
            "data": data,
            "id" : this.lastID
        })
    });
})
//update the new data using Car_ID as id for the table.
app.patch("/api/car_racer/:id", (req, res, next) => {
    var data = {
        Car_ID: req.body.Car_ID,
        Racer_Turbo: req.body.Racer_Turbo,
        Racer_Supercharged: req.body.Racer_Supercharged,
        Racer_Performance: req.body.Racer_Performance,
        Racer_Horsepower: req.body.Racer_Horsepower
    }
    db.run(
        `UPDATE car_racer set 
            Car_ID = COALESCE(?,Car_ID), 
            Racer_Turbo = COALESCE(?,Racer_Turbo), 
            Racer_Supercharged = COALESCE(?,Racer_Supercharged), 
            Racer_Performance = COALESCE(?,Racer_Performance), 
            Racer_Horsepower = COALESCE(?,Racer_Horsepower), 
            WHERE id = ?`,
        [data.Car_ID,data.Racer_Turbo,data.Racer_Supercharged,
            data.Racer_Performance,data.Racer_Horsepower,req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "update success",
                data: data,
                changes: this.changes
            })
    });
})

//API endpoints for car_mods
//get all of the rows and fields from particular table from database.
app.get("/api/car_mods", (req, res, next) => {
    var sql = "select * from car_mods"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});
//get a single row by Car_ID as id from particular table from database.
app.get("/api/car_mods/:id", (req, res, next) => {
    var sql = "select * from car_mods where Car_ID = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"get success",
            "data":row
        })
      });
});
//insert new data from user input into the table.
app.post("/api/car_mods/", (req, res, next) => {
    var errors=[]
    if (!req.body.Car_ID){
        errors.push("No Car_ID specified");
    }
    if (!req.body.Mods_Paint){
        errors.push("No Mods_Paint specified");
    }
    if (!req.body.Mods_Body){
        errors.push("No Mods_Body specified");
    }
    if (!req.body.Mods_Wrap){
        errors.push("No Mods_Wrap specified");
    }
    if (!req.body.Mods_Rims){
        errors.push("No Mods_Rims specified");
    }
    if (!req.body.Mods_Interior){
        errors.push("No Mods_Interior specified");
    }
    if (!req.body.Mods_Other){
        errors.push("No Mods_Other specified");
    }
    if (!req.body.Mods_ICE){
        errors.push("No Mods_ICE specified");
    }
    if (!req.body.Mods_Aftermarket){
        errors.push("No Mods_Aftermarket specified");
    }
    if (!req.body.Mods_WIP){
        errors.push("No Mods_WIP specified");
    }
    if (!req.body.Mods_Overall){
        errors.push("No Mods_Overall specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        Car_ID: req.body.Car_ID,
        Mods_Paint: req.body.Mods_Paint,
        Mods_Body: req.body.Mods_Body,
        Mods_Wrap: req.body.Mods_Wrap,
        Mods_Rims: req.body.Mods_Rims,
        Mods_Interior: req.body.Mods_Interior,
        Mods_Other: req.body.Mods_Other,
        Mods_ICE: req.body.Mods_ICE,
        Mods_Aftermarket: req.body.Mods_Aftermarket,
        Mods_WIP: req.body.Mods_WIP,
        Mods_Overall: req.body.Mods_Overall
    }
    var sql ='INSERT INTO car_mods (Car_ID,Mods_Paint,Mods_Body,Mods_Wrap,Mods_Rims,Mods_Interior,Mods_Other,Mods_ICE,Mods_Aftermarket,Mods_WIP,Mods_Overall) VALUES (?,?,?,?,?,?,?,?,?,?,?)'
    var params =[data.Car_ID,data.Mods_Paint,data.Mods_Body,data.Mods_Wrap,
        data.Mods_Rims,data.Mods_Interior,data.Mods_Other,data.Mods_ICE,
        data.Mods_Aftermarket,data.Mods_WIP,data.Mods_Overall]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "insert success",
            "data": data,
            "id" : this.lastID
        })
    });
})
//update the new data using Car_ID as id for the table.
app.patch("/api/car_mods/:id", (req, res, next) => {
    var data = {
        Car_ID: req.body.Car_ID,
        Mods_Paint: req.body.Mods_Paint,
        Mods_Body: req.body.Mods_Body,
        Mods_Wrap: req.body.Mods_Wrap,
        Mods_Rims: req.body.Mods_Rims,
        Mods_Interior: req.body.Mods_Interior,
        Mods_Other: req.body.Mods_Other,
        Mods_ICE: req.body.Mods_ICE,
        Mods_Aftermarket: req.body.Mods_Aftermarket,
        Mods_WIP: req.body.Mods_WIP,
        Mods_Overall: req.body.Mods_Overall
    }
    db.run(
        `UPDATE car_mods set 
            Car_ID = COALESCE(?,Car_ID), 
            Mods_Paint = COALESCE(?,Mods_Paint), 
            Mods_Body = COALESCE(?,Mods_Body), 
            Mods_Wrap = COALESCE(?,Mods_Wrap), 
            Mods_Rims = COALESCE(?,Mods_Rims), 
            Mods_Interior = COALESCE(?,Mods_Interior), 
            Mods_Other = COALESCE(?,Mods_Other), 
            Mods_ICE = COALESCE(?,Mods_ICE), 
            Mods_Aftermarket = COALESCE(?,Mods_Aftermarket), 
            Mods_WIP = COALESCE(?,Mods_WIP), 
            Mods_Overall = COALESCE(?,Mods_Overall), 
            WHERE id = ?`,
        [data.Car_ID,data.Mods_Paint,data.Mods_Body,data.Mods_Wrap,
            data.Mods_Rims,data.Mods_Interior,data.Mods_Other,data.Mods_ICE,
            data.Mods_Aftermarket,data.Mods_WIP,data.Mods_Overall,req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "update success",
                data: data,
                changes: this.changes
            })
    });
})

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});
