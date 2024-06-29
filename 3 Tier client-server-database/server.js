let mongoose=require("mongoose");
let express=require("express");
let cors=require("cors");

let app=express();
app.use(cors());
app.get("/getStudents",async(req,res)=>{
     let studentArr=await Student.find();
     res.json(studentArr);
})
app.listen(1405,()=>{
  console.log("Listening to port 1405");
});
let studentSchema=new mongoose.Schema({
  firstName:{
      type: String,
      validate: {
        validator: function(v) {
          return /^[A-Za-z]{2,28}$/.test(v);
        },
        message: props => `${props.value} is not a valid FirstName!`
      },
      required:[true, "firstName  is mandatory"],
    },
    lastName:{
      type: String,
      validate: {
        validator: function(v) {
          return /^[A-Za-z ]{2,28}$/.test(v);
        },
        message: props => `${props.value} is not a LastName!`
      },
      required: [true, "lastName address is mandatory"],
    },
  age:{
      type:Number,
      min:[13,"Too early to create an account"],
      max:[75,"Too late to create an account"],
      required:[true,"Age is mandatory"]
  },
  email:{
      type: String,
      validate: {
        validator: function(v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: props => `${props.value} is not a valid  email!`
      },
      required: [true, "email address is mandatory"],
    },
  mobileNo:{
      type: String,
      validate: {
        validator: function(v) {
          return /^\+91-[6-9]\d{9}$/.test(v);
        },
        message: props => `${props.value} is not a valid MobileNO!`
      },
      required: [true, "mobileNO is mandatory"],
    },
  gender:{
      type:String,
      required:[true,"Gender is mandatory."],
      lowercase:true,
      enum:["male","female","others"],
  },
  htNo:String,
});

let Student=new mongoose.model(`students`,studentSchema);

let insertDataIntoMDB=async()=>{

  try{
      let akhil=new Student({
          firstName:"Akhil",
          lastName:"Chinnamsetti",
          age:"22",
          email:"akhilchinnamsetti@gmail.com",
          mobileNo:"+91-7075599168",
          gender:"Male",
          htNo:"20M61A0573",
      });
  
      let rama=new Student({
          firstName:"Rama",
          lastName:"Banoth",
          age:"23",
          email:"ramabanoth@gmail.com",
          mobileNo:"+91-8499973187",
          gender:"Male",
          htNo:"20M61A0575",
      });

      let uma=new Student({
          firstName:"Uma",
          lastName:"Chintala",
          age:"21",
          email:"umakeerthika@gmail.com",
          mobileNo:"+91-9866572156",
          gender:"Female",
          htNo:"20M61A0574",
      });
      // await akhil.save();
      // await rama.save();
      //await uma.save();
      Student.insertMany([akhil,rama,uma])
      console.log(`Successfully inserted data into Database`);
      
  }catch(err){
     console.log(`Unable to insert data into Database`);
  }
  };
  let getDataFromDB=async()=>{
        let studentsArr=await Student.find();
        console.log(studentsArr);
  }
let connectToMDB=async()=>{
     
      try{
        await mongoose.connect("mongodb+srv://akhilchinnamsetti:akhilch1405@batch2403.derqdcc.mongodb.net/?retryWrites=true&w=majority&appName=batch2403");

        console.log("Successfully connected to MDB")
        insertDataIntoMDB();
        getDataFromDB();
        
      }catch(err){
        console.log("Unable to  connected to MDB")    
    }
}

connectToMDB();