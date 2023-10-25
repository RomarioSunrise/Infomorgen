import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import InfomorgenModel from "./models/infomorgen.js";
import ContactModel from "./models/contact.js";

const app = express();

const dbURI = 'mongodb://localhost:27017/contactform';
const port = 3000;

const Schema = mongoose.Schema;

await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true});
    console.log('connected to db')

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/add', (req, res) => {
    const Infomorgen = new InfomorgenModel(
    {Name: 'Maria', Beruf: 'lorum'}
    );
    Infomorgen.save();
    console.log(`/add is running`);
})
app.post('/add', async (req, res) => {
    const Contact = new ContactModel({
        Typ: req.body.group1,
        Technik: req.body.group2,
        Antragsteller: req.body.Antragsteller,
        Partnernetz: req.body.Partnernetz,
        Kundennummer: req.body.Kundennummer,
        Vorname: req.body.Vorname,
        Nachname: req.body.Nachname,
        Anliegen: req.body.Anliegen       
    })
    Contact.save();
    console.log(`New Contact Saved in DB`);
    
    //const blogs = [
    //    {title: 'Yoshi', snippet: 'lorem'},
    //    {title: 'Mario', snippet: 'Marem'},
    //    {title: 'Luigi', snippet: 'Go 4 it'},
    //];
    //Contact.find({});

     const data = await ContactModel.find({});
     //res.send(blogs);

     res.render('printAll',  {"contacts" : data} );  

    console.log(data)
    //res.json({'customers': blogs})
    //res.render('printAll', {title: 'Home', blogs});
        
    //const blogs = docs.toJSON();
    //const blogs = Contact.find({});
}); 


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
  
app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi', snippet: 'lorem'},
        {title: 'Mario', snippet: 'Marem'},
        {title: 'Luigi', snippet: 'Go 4 it'},
    ];
    res.render('index', {title: 'Home', blogs});
});
