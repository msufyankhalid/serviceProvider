const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const createAdmin = require("./seeder");
const jobRoutes = require("./routes/jobRoute");
const cruRoutes = require("./routes/cruRoutes");
const serviceTypeRoutes = require("./routes/serviceTypeRoutes");




dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

//..Routes..
app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/serviceRequests", require("./routes/serviceRequestRoute"));

app.use("/api/jobs", jobRoutes);

app.use("/api/cru", cruRoutes);

app.use("/api/dashboard", require("./routes/dashboardRoutes"));

app.use("/api/feedback", require("./routes/feedbackRoutes"));

app.use("/api/servicetype", serviceTypeRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("MongoDB Connected");

    await createAdmin(); // Server chalne ke bd admin create kiya

    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch(err => console.log(err));





 