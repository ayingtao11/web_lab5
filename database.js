var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const database_source = 'db.sqlite'

let db = new sqlite3.Database(database_source, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE IF NOT EXISTS car_owners (
            Car_ID TEXT,
            Email TEXT,
            Name TEXT,
            Year TEXT,
            Make TEXT,
            Model TEXT
            )`,
        (err) => {
            if (err) {
                // Table already created
            }
        });
        db.run(`CREATE TABLE IF NOT EXISTS car_judges ( 
            Car_ID TEXT,Judge_ID TEXT,Judge_Name TEXT
            )`,
        (err) => {
            if (err) {
                // Table already created
            }
        });
        db.run(`CREATE TABLE IF NOT EXISTS car_body_frame ( 
            Car_ID TEXT,Body_Frame_Undercarriage TEXT,Body_Frame_Suspension TEXT,
            Body_Frame_Chrome TEXT,Body_Frame_Detailing TEXT,Body_Frame_Cleanliness TEXT
            )`,
        (err) => {
            if (err) {
                // Table already created
            }
        });
        db.run(`CREATE TABLE IF NOT EXISTS car_engine ( 
            Car_ID TEXT,Engine_Modifications TEXT,Engine_Performance TEXT,
            Engine_Chrome TEXT,Engine_Detailing TEXT,Engine_Cleanliness TEXT
            )`,
        (err) => {
            if (err) {
                // Table already created
            }
        });
        db.run(`CREATE TABLE IF NOT EXISTS car_racer ( 
            Car_ID TEXT,Racer_Turbo TEXT,Racer_Supercharged TEXT,
            Racer_Performance TEXT,Racer_Horsepower TEXT
            )`,
        (err) => {
            if (err) {
                // Table already created
            }
        });
        db.run(`CREATE TABLE IF NOT EXISTS car_mods ( 
            Car_ID TEXT,Mods_Paint TEXT,Mods_Body TEXT,Mods_Wrap TEXT,Mods_Rims TEXT,
            Mods_Interior TEXT,Mods_Other TEXT,Mods_ICE TEXT,Mods_Aftermarket TEXT,
            Mods_WIP TEXT,Mods_Overall TEXT
            )`,
        (err) => {
            if (err) {
                // Table already created
            }
        });
    }
});

module.exports = db