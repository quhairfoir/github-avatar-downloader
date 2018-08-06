var request = require('request');
var secrets = require('./secrets');
var ghtoken = secrets.GITHUB_TOKEN;

console.log("Welcome to the GitHub Avatar Downloader - v.Morag")

function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': ghtoken
    }
  };

  request(options, function(err, res, body){
    var result = JSON.parse(body);
    cb(err, result);
    });
}

getRepoContributors("jquery", "jquery", cb);



function cb(err, result) {
  result.forEach (function(result) {
    console.log(result.avatar_url);
  })
};