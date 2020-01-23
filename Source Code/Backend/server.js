const express = require("express");
const cors = require("cors");
const DB = require("./database");

const app = express();
app.use(cors());
app.use((request, response, next) => {
  response.header(`Access-Control-Allow-Origin`, `*`);
  response.header(
    `Access-Control-Allow-Headers`,
    `Origin, X-Requested-with, Content-Type, Accept`
  );
  next();
});
app.use(express.json());

app.get("/", (req, res) => res.json("test working"));


// ----------------------------------- Functions ------------------------------------------


// --------------------------------- User Functions ------------------------------------------

// Register Function

app.post("/register", (req, res) => {
  DB.register(user => {
    res.json(user)
  }, req.body)
})


// Login Function

app.post("/login", (req, res) => {
  DB.login(user => {
    res.json(user)
  }, req.body)
})


// get Logged In User Function

app.post("/getLoggedInUser", (req, res) => {
  DB.getLoggedInUser(user => {
    res.json(user)
  }, req.body)
})


// Get Users Function

app.get("/getUsers", (req, res) => {
  DB.getUsers(users => {
    res.json(users)
  })
})


// Update User Profile Function

app.put("/updateProfile", (req, res) => {
  DB.updateProfile(user => {
    res.json(user)
  }, req.body)
})


// --------------------------------- Jobs Functions ------------------------------------------

// Add Job Function

app.post("/addJob", (req, res) => {
  DB.addJob(newJob => {
    res.json(newJob)
  }, req.body)
})

app.post("/addJob", (req, res) => {
  DB.addJob(newJob => {
    res.json(newJob)
  }, req.body)
})

// Get Jobs Function

app.get("/getJobs", (req, res) => {
  DB.getJobs(jobs => {
    res.json(jobs)
  })
})


// Get Job

app.post("/getJob", (req, res) => {
  DB.getJob(jobs => {
    res.json(jobs)
  }, req.body)
})

// Get User Jobs

app.post("/getUserJobs", (req, res) => {
  DB.getUserJobs(jobs => {
    res.json(jobs)
  }, req.body)
})


// Get User Jobs Appliciations
app.post("/getUserJobsApplications", (req, res) => {
  DB.getUserJobsApplications(jobs => {
    res.json(jobs)
  }, req.body)
})


// Apply Job Function
app.post("/applyJob", (req, res) => {
  DB.applyJob(apply => {
    res.json(apply)
  }, req.body)
})

// Get Add Applications Function
app.post("/addJobApplication", (req, res) => {
  DB.addJobApplication(job => {
    res.json(job)
  }, req.body)
})


// Get Jobs Applications Function
app.get("/getJobsApplications", (req, res) => {
  DB.getJobsApplications(jobs => {
    res.json(jobs)
  })
})


// Get Job Application Function
app.post("/getJobApplication", (req, res) => {
  DB.getJobApplication(job => {
    res.json(job)
  }, req.body)
})




// Add Company Funcction
app.post("/AddCompany", (req, res) => {
  DB.AddCompany(company => {
    res.json(company)
  }, req.body)
})


// Get Companies Function
app.get("/getCompanies", (req, res) => {
  DB.getCompanies(companies => {
    res.json(companies)
  })
})


// Get Company Function
app.post("/getCompany", (req, res) => {
  DB.getCompany(company => {
    res.json(company)
  }, req.body)
})


// Delete Company Function
app.post("/deleteCompany", (req, res) => {
  DB.deleteCompany(company => {
    res.json(company)
  }, req.body)
})


// Delete Job Function
app.post("/deleteJob", (req, res) => {
  DB.deleteJob(job => {
    res.json(job)
  }, req.body)
})

// Delete Job Application Function
app.post("/deleteJobApplication", (req, res) => {
  DB.deleteJobApplication(job => {
    res.json(job)
  }, req.body)
})



// Delete Job Function
app.post("/deleteJobApplier", (req, res) => {
  DB.deleteJobApplier(appliers => {
    res.json(appliers)
  }, req.body)
})

// Contactus Function
app.post("/contactus", (req, res) => {
  DB.contactus(contact => {
    res.json(contact)
  }, req.body)
})


// Get Messages function

app.get("/getMessages", (req, res) => {
  DB.getMessages(messages => {
    res.json(messages)
  })
})

// Get All Messages function

app.get("/getAllMessages", (req, res) => {
  DB.getAllMessages(messages => {
    res.json(messages)
  })
})



// Read Message Function
app.post("/readMessage", (req, res) => {
  DB.readMessage(read => {
    res.json(read)
  }, req.body)
})



// Delete Message Function
app.post("/deleteMessage", (req, res) => {
  DB.deleteMessage(read => {
    res.json(read)
  }, req.body)
})


// Search Job Function
app.post("/searchJob", (req, res) => {
  DB.searchJob(jobs => {
    res.json(jobs)
  }, req.body)
})

// Search Job Application Function
app.post("/searchJobApplication", (req, res) => {
  DB.searchJobApplication(jobs => {
    res.json(jobs)
  }, req.body)
})


// Search Company Function
app.post("/searchCompany", (req, res) => {
  DB.searchCompany(jobs => {
    res.json(jobs)
  }, req.body)
})

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}`);
});
