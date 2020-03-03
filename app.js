const bodyParser = require("body-parser"),
  express = require("express"),
  app = express(),
  days = require("./dataObjects/days"),
  landingPage = require("./dataObjects/landingPage");

app.set("port", process.env.PORT || 8080);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var restart;
var sessions;
var data = landingPage;

function save(data, value, num) {
  for (var i = 0; i < sessions.length; i++) {
    sessions[i][value] = data[i + num][value];
  }
}

app.get("/", function(req, res) {
  res.render("index", { data: data });
});

app.get("/restart", function(req, res) {
  save(restart, "weight", 0);
  save(restart, "completed", 0);
  res.redirect("/session");
});

app.get("/session", function(req, res) {
  res.render("session", { sessions: sessions });
});

app.post("/session", function(req, res) {
  save(req.body, "weight", 1);
  save(req.body, "completed", 1);
  res.redirect("/session");
});

app.get("/session/:id", function(req, res) {
  if (!(req.params.id in days)) {
    res.redirect("/");
    console.log(`This Key doesn't exist in the Object!`);
  } else {
    sessions = days[req.params.id].session;
    restart = days[req.params.id].restart;
    res.redirect("/session");
  }
});

app.get("/timer", function(req, res) {
  res.render("timer");
});

app.listen(app.get("port"), function() {
  console.log("Express started on http://localhost:" + app.get("port"));
});
