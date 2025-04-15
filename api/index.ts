var express = require("express");
var app = express();

app.get("/sosang", function (req: any, res: any) {
  const { key, servicekey, type } =
    req.query;

  var api_url =
    "http://apis.data.go.kr/B553077/api/open/sdsc2/storeZoneOne";
  var request = require("request");
  var options = {
    url: api_url,
    qs: { key, servicekey, type },
  };

  request.get(options, function (error: any, response: any, body: any) {
    if (!error && response.statusCode == 200) {
      res.writeHead(200, { "Content-Type": "application/xml;charset=utf-8" });
      res.end(body);
    } else {
      res.status(response.statusCode).end();
      console.log("error = " + response.statusCode);
    }
  });
});

app.listen(3000, function () {
  console.log(
    "http://127.0.0.1:8080/sosang?key=9174&servicekey=zWJZJMGi7kBIlToG%2FGVb4RpeALKnhLOKl6B0XRnr%2Bs2w2WtifQ1c8ktURng7cT9gtnNh%2FjkBOrSD0rBqE2mPlA%3D%3D&type=xml app listening on port 8080!"
  );
});