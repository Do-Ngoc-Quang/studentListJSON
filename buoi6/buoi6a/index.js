const express = require('express');
const cors = require("cors");
const app = express();
let corsOptions = {
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500']
};
app.use(cors(corsOptions));
const port = 3000;

const dssv = require('./DSSV1.json');

const bodyParser = require('body-parser');
var urlParser = bodyParser.urlencoded({ extended: false });
// app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Welecome to EXPRESS backend!!');
});

//GET 
app.get('/students', (req, res) => {
    res.send(Object.values(dssv));
});
app.get('/students/:mssv', (req, res) => {
    console.log(req.params.mssv);
    let i = 0;
    for (i = 0; i < dssv.length; i++) {
        if (dssv[i].codeStudent == req.params.mssv) {
            break;
        }
    }
    if (i < dssv.length) {
        res.send(dssv[i]);
    }
    else {
        res.send("Not Fond!!");
    }
});

// POST
app.post("/addstudents", urlParser, (req, res) => {
    var sv = req.body;
    var result = dssv.find(item => item.MaSV === sv.MaSV);
    console.log(result);
    res.send(req.body);
});


app.put('/students', (req, res) => {
    res.send('PUT students!!');
});
app.delete('/students/:mssv', (req, res) => {
    const studentCode = req.params.mssv;
    const students = require('./DSSV1.json');

    const updatedStudents = students.filter(student => student.mssv !== studentCode);

    fs.writeFile('./DSSV1.json', JSON.stringify(updatedStudents), (err) => {
        if (err) throw err;
        res.status(200).send(`Student with ID ${studentCode} deleted successfully!`);
    });
});

app.listen(port, () => console.log(`App is running at port ${port}`));