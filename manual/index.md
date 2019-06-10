# Extra Documentation
This contains aditional reading material to briefly understand decisions that were made.

## Idea
The idea was to create some sort of IoT Dashboard for the data provided by Tinkerforge.
We have client and server components as one application that can run without the need of the other.
The client gathers environmental data with Tinkerforge, keeps them local, and seends them to the server, but also offers if wanted a local dashboard.
The Server collects all the data provided by the clients and offers an unified interface to see the data.

Server checks every 5 seconds whether all peers are still connected with a ping - pong message.
Client sends every second all collected environmental data to the server.

## Architecture

### Communication
For the communication we used [Zeromq](zeromq.org) to make use of their already defined asynchronious patterns.
In the future something like websockets would have probably been a better choice to create a bidirectional communication.
Zeromq takes a lot of work from you but understanding how everything works and also the fact that you can't costumize everything is quite frustrating.

Websockets on the other would have been quite similiar but don't handle everything in bytes and the construct around it, is rather raw and not as defined in zeromq already.

As communication pattern we decided for Dealer to Router, as it provides as with a bidrectional channel and the option to talk to specific peers with as many Dealers as we want.

Other options we looked at:
Dealer to Dealer - quite interesting at the first glance, but as soon as you add another peer your application will be killed by Round-robin as some messages are received by Dealer A, some by Dealer B and so on. If you only have two peers then this is a valid option, but as we wanted to be able to add lots of clients therefore this was not an option.

Subscriber / Publisher - it's unreasonable to open two TCP sockets to just communicate in a bidirectional way and on top of that there is no security that other peers might not be listening to the communication, meaning everyone will receive all messages and there is no direct bidirectional communication between two specific peers.


One thing that stuck with me from the lecture the most was, that applications have to be created in a layered fashion.
In our case this means that specific parts of the application can be turned off in case the fog node does not have the required computational power.

First we have the message layer, in which we have two define option for server/client depending on where the application runs.
The server part consists of a frontend and a backend combined as one and could be split up into two parts in the future, if wanted.

The layered architecture allows us to run a client with frontend as standalone application without the neeed of a server.

Zeromq will take care of buffering messages from Dealer to Router, this is currently set to unlimited.
The Router won't buffer messages for the simple reason that we will never know whether a Dealer will connect again to the Router and is implemented like that in zeromq and can not be changed. It does make sense as the Router will have an unspecified amount of Dealers and buffering all messages for all Dealers could potentially kill the Router rather quickly.
Transmitted data is obviously saved in a database.g

### Database
As a local mongodb can be quite expensive for small devices we decided to use an inmemory database called [Loki.js](http://lokijs.org/). Without a lot of effort lokijs can be changed to mongodb as their defined functions are rather similiar.
On top of that we created a class called `DatabaseHandler` which can easily be switched for another implementation without needing to change any code in the rest of the application.

## Tinkerforge Mock
The Tinkerforge Mock is based on the repository provided [here](https://github.com/PlayWithIt/TFStubserver).

It emulates predefined hardware on IP level and allows to easily connect to the emulated Tinkerforge devices.

For easy development access we forked the [project](https://github.com/Langleu/TFStubserver) and provided a Dockerfile and [Dockerimage](https://cloud.docker.com/u/langleu/repository/docker/langleu/tfstubserver). This allows to quickly spin up a local Tinkerforge mock.

## Disclaimer
The generated docs do not include every comment and for further information please look at the source code itself.

Javascript is not perfect when it comes to automatic creation of documentation as not always OOP style is used.

ESDoc does not understand the concept of `require` and thereby wants every single `require` described, hence the low computated coverage.