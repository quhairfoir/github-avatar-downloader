// required modules
var request = require('request');
var secrets = require('./secrets');
var fs = require('fs');

// variables from modules and command line arguments
var ghtoken = secrets.GITHUB_TOKEN;
var args = process.argv.slice(2);
var repoOwner = args[0];
var repoName = args[1];

console.log("Welcome to the GitHub Avatar Downloader - v.Morag")

// cb is the callback function, defined below
function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': ghtoken
    }
  };

  // stop function if command line arguments not given
  if (repoOwner && repoName) {

  request(options, function(err, res, body) {
    var result = JSON.parse(body);
    cb(err, result);
    });
  } else {
    console.log("You must specify the name of the Repo and its owner!");
  }
}

// function that loops over array of objects returned in body
function cb(err, result) {
  result.forEach (function(result) {
    downloadImageByURL(result.avatar_url, ("avatars/" + result.login + ".jpg"));
  })
};

// downloads images and saves to new file in specified location
function downloadImageByURL(url, filePath) {
  request.get(url)
  .pipe(fs.createWriteStream("./" + filePath));
}

//function call
getRepoContributors(repoOwner, repoName, cb);



