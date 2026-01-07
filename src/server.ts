import app from "./app";
import dbConnect from "./utils/dbConnect";
import config from "./config";
import seedSuperAdmin from "./db";
import { Server } from "http";

let server: Server;

const port = config.port || 9090;


async function main() {
    try {
      await dbConnect();
      await seedSuperAdmin();
      server = app.listen(port,  () => {
        console.log(`Example app listening on port ${port}`);
      });

    } catch (error) {
      console.log(error);
    }
  }
  
  main();



  //asynchronous code error
  process.on('unhandledRejection', (err)=>{
    console.log(`❤❤ unahandledRejection is detected , shutting down ...`, err);
    if(server){
      server.close(()=>{
        process.exit(1);
      })
    }
    process.exit(1)
  })



  //synchronous code error--process immediately off
  process.on('uncaughtException', () => {
    console.log(`😛😛 uncaughtException is detected , shutting down ...`);
    process.exit(1);
  });

/*
import http from "http";
import app from "./app";
import dbConnect from "./utils/dbConnect";
import config from "./config";
import seedSuperAdmin from "./db";
import { Server } from "socket.io";


const server = http.createServer(app);

const port = config.port || 9090;

//Initialize socket.io server
export const io = new Server(server, {
  cors: { origin: "*" },
});

//store online users
//export const userSocketMap = {}; //{ userId:socketId }
// userId -> socketId map
export const userSocketMap: Record<string, string> = {};


//socket.io connection handler

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User Connected", userId);

  if (userId) {
    userSocketMap[userId as string] = socket.id;
  }

  //emit online users to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap)); //send online users

  //user disconnected
  socket.on("disconnect", () => {
    console.log("User Disconnected", userId);
    delete userSocketMap[userId as string];

    io.emit("getOnlineUsers", Object.keys(userSocketMap)); //again send online users
  });
});



async function main() {
    try {
      await dbConnect();
      await seedSuperAdmin();
      server.listen(port,  () => {
        console.log(`Example app listening on port ${port}`);
      });

    } catch (error) {
      console.log(error);
    }
  }
  
  main();



  //asynchronous code error
  process.on('unhandledRejection', (err)=>{
    console.log(`❤❤ unahandledRejection is detected , shutting down ...`, err);
    if(server){
      server.close(()=>{
        process.exit(1);
      })
    }
    process.exit(1)
  })



  //synchronous code error--process immediately off
  process.on('uncaughtException', () => {
    console.log(`😛😛 uncaughtException is detected , shutting down ...`);
    process.exit(1);
  });
*/

 
 