const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/job-m", {
    useNewUrlParser: true
});

//_______________________________________________ATLAS_________________________________________________________

// mongoose.connect('mongodb+srv://ghzawi:9941005586@head-start-sgs5q.mongodb.net/test?retryWrites=true&w=majority',{useNewUrlParser:true})
// .then( () => {
//    console.log('Connection to the Atlas Cluster is successful!')
//  })
//  .catch( (err) => console.error(err));


//_____________________________________________END ATLAS_______________________________________________________
const DB = mongoose.connection;


DB.on("error", function () {
    console.log("CONNECTION FAILED");
});
DB.once("open", function () {
    console.log("CONNECTION SUCCESS");
    console.log("____________________________________________________________________________");
});

// =========================================== Schema ==============================================================
const usersSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    repassword: String,
    phone: Number,
    field: String,
    address: String,
    experience: Number,
    info: String,
    role: String,
});

const Users = mongoose.model("users", usersSchema);

// =========================================== Schema ==============================================================
const jobsSchema = new mongoose.Schema({
    name: String,
    field: String,
    company: String,
    experience: Number,
    salary: Number,
    time: String,
    address: String,
    info: String,
    user_id: String,
    applied: Array,
})

const Jobs = mongoose.model("jobs", jobsSchema)

// =========================================== Schema ==============================================================
const jobsApplicationsSchema = new mongoose.Schema({
    name: String,
    field: String,
    experience: Number,
    salary: Number,
    time: String,
    address: String,
    info: String,
    user_id: String,
})

const JobsApplications = mongoose.model("jobsapplications", jobsApplicationsSchema)


// =========================================== Schema ==============================================================
const companiesSchema = new mongoose.Schema({
    name: String,
    user_id: String,
    field: String,
    products: Array,
    address: String,
    time: String,
    info: String,
    website: String,
    email:String,
    phone:Number
})

const Companies = mongoose.model("companies", companiesSchema)


// =========================================== Schema ==============================================================

const contactusschema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    status: String
})

const Contactus = mongoose.model("contactus", contactusschema)



// ------------------------------------------ Functions -----------------------------------------------------------

// --------------------------------- User Functions ------------------------------------------


// Register Function
const register = (cb, obj) => {
    let email = obj.email
    let newUser = obj
    Users.findOne(
        { email },
        (err, doc) => {
            if (err) {
                console.log(err)
            }
            else if (doc === null) {
                Users.create(
                    newUser,
                    (err, doc) => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            cb(doc)
                        }
                    })
            }
            else if (doc !== null) {
                cb("already registered")
            }
        }
    )
}


// Login Function

const login = (cb, obj) => {
    let email = obj.email
    let password = obj.password
    Users.findOne(
        { email },
        (err, doc) => {
            if (err) {
                console.log(err)
            }
            else if (doc == null) {
                cb(null)
            }
            else if (password == doc.password) {
                cb(doc)
            }
            else {
                cb(null)
            }

        }
    )
}

// Get Logged In User Function

const getLoggedInUser = (cb, obj) => {
    let _id = obj._id
    Users.findOne(
        { _id },
        (err, doc) => {
            if (err) {
                console.log(err)
            }
            else {
                cb(doc)
            }
        }
    )
}


// Get Users Function

const getUsers = cb => {
    Users.find(
        {},
        (err, users) => {
            if (err) {
                console.log(err)
            } else {
                cb(users)
            }
        }
    )
}



// Update Profile Function

const updateProfile = (cb, { _id, name, email, phone, field, address, experience, info, born }) => {
    Users.updateOne(
        { _id },
        { $set: { name, email, phone, field, address, experience, info, born } },
        (err, doc) => {
            if (err) {
                console.log(err)
            }
            else {
                cb(doc)
            }
        }
    )
}




// --------------------------------- Jobs Functions ------------------------------------------

// Add Job Function

const addJob = (cb, obj) => {
    let newJob = obj
    Jobs.create(
        newJob,
        (err, doc) => {
            if (err) {
                console.log(err)
            }
            else {
                cb(doc)
            }
        })
}

// Get Jobs Function

const getJobs = cb => {
    Jobs.find(
        {},
        (err, jobs) => {
            if (err) {
                console.log(err)
            }
            else {
                cb(jobs)
            }
        }
    )
}

// Get Job Function

const getJob = (cb, obj) => {
    let _id = obj.job_id
    Jobs.findOne(
        { _id },
        (err, job) => {
            if (err) {
                console.log(err)
            }
            else {
                cb(job)
            }
        }
    )
}

// Get User Jobs Function

const getUserJobs = (cb, _id) => {
    Jobs.find(
        { user_id: _id },
        (err, jobs) => {
            if (err) {
                console.log(err)
            }
            else {
                cb(jobs)
            }
        }
    )
}


// Get User Jobs Function

const getUserJobsApplications = (cb, _id) => {
    JobsApplications.find(
        { user_id: _id },
        (err, jobs) => {
            if (err) {
                console.log(err)
            }
            else {
                cb(jobs)
            }
        }
    )
}

// Apply Job Function

const applyJob = (cb, obj) => {
    let _id = obj._id
    let applied = obj.applied
    Jobs.updateOne(
        { _id },
        { $set: { applied } },
        (err, doc) => {
            if (err) {
                console.log(err)
            }
            else {
                cb(doc)
            }
        }
    )
}


// Add Job Application Function

const addJobApplication = (cb, obj) => {
    JobsApplications.create(
        obj,
        (err, doc) => {
            if (err) {
                console.log(err)
            }
            else {
                cb(doc)
            }
        }
    )
}


// Get Job Applications Function

const getJobsApplications = cb => {
    JobsApplications.find(
        {},
        (err, jobs) => {
            if (err) {
                console.log(err)
            }
            else {
                cb(jobs)
            }
        }
    )
}


// get Job Application Function

const getJobApplication = (cb, obj) => {
    let _id = obj._id
    JobsApplications.findOne(
        { _id },
        (err, doc) => {
            if (err) {
                console.log(err)
            }
            else {
                cb(doc)
            }
        }
    )
}




// Add Company Function
const AddCompany = (cb, obj) => {
    Companies.create(
        obj,
        (err, doc) => {
            if (err) {
                console.log(err)
            }
            else {
                cb(doc)
            }
        }
    )
}


// Get Companies Functions

const getCompanies = cb => {
    Companies.find(
        {},
        (err, companies) => {
            if (err) {
                console.log(err)
            }
            else {
                cb(companies)
            }
        }
    )
}




// Get Company Function

const getCompany = (cb, obj) => {
    let _id = obj._id
    Companies.findOne(
        { _id },
        (err, job) => {
            if (err) {
                console.log(err)
            }
            else {
                cb(job)
            }
        }
    )
}



// Delete Company Function
const deleteCompany = (cb, obj) => {
    let _id = obj._id
    Companies.deleteOne(
        { _id },
        (err, company) => {
            if (err) {
                console.log(err)
            }
            else {
                cb(company)
            }
        }
    )
}



// Delete Job Function
const deleteJob = (cb, obj) => {
    let _id = obj._id
    Jobs.deleteOne(
        { _id },
        (err, job) => {
            if (err) {
                console.log(err)
            }
            else {
                cb(job)
            }
        }
    )
}


// Delete Job Application Function
const deleteJobApplication = (cb, obj) => {
    let _id = obj._id
    JobsApplications.deleteOne(
        { _id },
        (err, job) => {
            if (err) {
                console.log(err)
            }
            else {
                cb(job)
            }
        }
    )
}


// Delete Job Applier Function
const deleteJobApplier = (cb, obj) => {
    let _id = obj.job_id
    let applied = obj.appliersAfterDelete

    Jobs.updateOne(
        { _id },
        { $set: { applied } },
        (err, doc) => {
            if (err) {
                console.log(err)
            }
            else {
                cb(doc)
            }
        }
    )

}


const contactus = (cb, obj) => {
    Contactus.create(
        obj,
        (err, doc) => {
            if (err) {
                console.log(err)
            }
            else {
                cb(doc)
            }
        }
    )
}

// Get Messages Function
const getMessages = (cb, obj) => {
    Contactus.find(
        { status: "unreaded" },
        (err, docs) => {
            if (err) {
                console.log(err)
            }
            else {
                cb(docs)
            }
        }
    )
}


// Get Messages Function
const getAllMessages = (cb, obj) => {
    Contactus.find(
        {},
        (err, docs) => {
            if (err) {
                console.log(err)
            }
            else {
                cb(docs)
            }
        }
    )
}



// Read Message Function
const readMessage = (cb, obj) => {
    let _id = obj
    Contactus.updateOne(
        { _id },
        { $set: { status: "readed" } },
        (err, doc) => {
            if (err) {
                console.log(err)
            }
            else {
                cb(doc)
            }
        }
    )
}


// Delete Message
const deleteMessage = (cb, obj) => {
    let _id = obj
    Contactus.deleteOne(
        { _id },
        (err, doc) => {
            if (err) {
                console.log(err)
            }
            else {
                cb(doc)
            }
        }
    )
}



// Search Job Function
const searchJob = (cb, obj) => {
    let field = obj.field
    Jobs.find(
        { field },
        (err, docs) => {
            if (err) {
                console.log(err)
            }
            else {
                cb(docs)
            }
        }
    )
}



// Search Job Application Function
const searchJobApplication = (cb, obj) => {
    let field = obj.field
    JobsApplications.find(
        { field },
        (err, docs) => {
            if (err) {
                console.log(err)
            }
            else {
                cb(docs)
            }
        }
    )
}



// Search Company Function
const searchCompany = (cb, obj) => {
    let field = obj.field
    Companies.find(
        { field },
        (err, docs) => {
            if (err) {
                console.log(err)
            }
            else {
                cb(docs)
            }
        }
    )
}

module.exports = {
    getUsers,
    register,
    login,
    getLoggedInUser,
    updateProfile,

    addJob,
    addJobApplication,

    deleteJob,
    deleteJobApplication,

    getJobs,
    getJob,

    getUserJobs,
    applyJob,

    getUserJobsApplications,

    getJobsApplications,
    getJobApplication,

    deleteJobApplier,

    AddCompany,
    getCompanies,
    getCompany,
    deleteCompany,

    contactus,
    getMessages,
    getAllMessages,
    readMessage,
    deleteMessage,


    searchJob,
    searchJobApplication,
    searchCompany,
}