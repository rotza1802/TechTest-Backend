const { User } = require("../models");
const axios = require("axios");
const express = require("express");
const app = express();
const request = require("request");
const { METHODS } = require("http");

var client_id = "0097a38d5d804ca6994536cead66b673";
var client_secret = "16d0a29c85fe44e3a4372d5fc4da469e";
let token = "";
token = token == "" ? refreshToken() : "";

function refreshToken() {
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "client_credentials",
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      token = body.access_token;
      console.log(token);
    }
  });
}

setInterval(refreshToken, 900 * 60 * 60);

module.exports = {
  ArtistName: async (req, res) => {
    var artistId = "";
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/search?q=${req.params.name}&type=artist`,
        {
          headers: {
            Authorization: `Bearer ` + token,
          },
        }
      );
      artistId = response.data.artists.items[0].id;
      console.log(artistId);

      const albums = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}/albums`,
        {
          headers: {
            Authorization: `Bearer ` + token,
          },
        }
      );
      console.log(albums.data);
      res.status(200).json(albums.data);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },
};