# short
An *extremely* simple URL shortener. It is composed of two parts: a web server
and a commandline interface.

## Server
The server is written in Nodejs and backed by mongoDB. All the server does is
redirect the short links to the actual URLs based on the entry in mongo.

## CLI
The commandline interface is written in Python and allows for easy manipulation
of the mongoDB link database. Provides commands to add, remove, view and
generate short links.

## License
MIT license. See the LICENSE file.
