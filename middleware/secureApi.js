let secureApi = (req, res, next) => {
//   console.log(req.headers.authorization);
  if (req.headers.authorization == "lkasdfu348909") {
    next();
  } else {
    res.send("Authorization Failed");
  }
  //   console.log("ami secureAPi e asi");
  //   next();
};

module.exports = secureApi;
