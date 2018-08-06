var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');
var ghtoken = secrets.GITHUB_TOKEN;
var args = process.argv.slice(2);
var repoOwner = args[0];
var repoName = args[1];

console.log("Welcome to the GitHub Avatar Downloader - v.Morag")

function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': ghtoken
    }
  };

  if (repoOwner && repoName) {

  request(options, function(err, res, body){
    var result = JSON.parse(body);
    cb(err, result);
    });
  } else {
    console.log("You must specify the name of the Repo and its owner!");
  }
}

getRepoContributors(repoOwner, repoName, cb);



function cb(err, result) {
  result.forEach (function(result) {
    downloadImageByURL(result.avatar_url, ("avatars/" + result.login + ".jpg"));
  })
};

function downloadImageByURL(url, filePath){
  request.get(url)
  .pipe(fs.createWriteStream("./" + filePath));
}