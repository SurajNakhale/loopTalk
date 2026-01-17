import { WebSocketServer, WebSocket } from "ws";


const wss = new WebSocketServer({port: 8080});

let userCount  = 0;
// let allSocket: WebSocket[] = [];

const allSocket = new Map<String, WebSocket[]>();


wss.on("connection", (socket)=>{
   


    userCount += 1;
    console.log("client connected!" + userCount);


    socket.on("message", (message)=>{
      
        const parsedMsg = JSON.parse(message.toString());
        
        if(parsedMsg.type === "join"){
            const roomId = parsedMsg.payload.roomId;
            
//@ts-ignore
            socket.roomId = roomId
            if(!allSocket.has(roomId)){
                allSocket.set(roomId, []);
                console.log(`created room: ${roomId}`)
            }

            allSocket.get(roomId)?.push(socket);

            console.log(`client joined room ${roomId} | total users: ${allSocket.get(roomId)!.length}` )
        
        }

        if(parsedMsg.type === "chat"){
            //@ts-ignore
            // socket -> current client
            const roomId = socket.roomId;
            const message = parsedMsg.payload.message;

            if(!roomId) return;


            //roomSockets -> all clients in room
            const roomsocket = allSocket.get(roomId);
            if(!roomsocket) return ;

            console.log(`message received in room ${roomId}: ${message}`)
            roomsocket.forEach(s => {
                if(s.readyState === WebSocket.OPEN){
                    s.send(JSON.stringify({
                        type:"chat",
                        payload: {
                            message: message
                        }
                    }))
                }
            })
        }

    });

    socket.on("close", () => {
        //@ts-ignore
        const roomId = socket.roomId;
        if(!roomId) return;


        //get all socket in that room
        const sockets = allSocket.get(roomId) 
        //Give me all the WebSocket connections that belong to this roomId.
        //Looks for the value stored under that key[roomId] -> value[websocket connnections]
        //return undefine if value is not find
        if(!sockets) return;

        
        //remove this socket from that room
        allSocket.set(
            roomId,
            sockets.filter(s => s !== socket)
        );

        if(allSocket.get(roomId)!.length == 0){
            allSocket.delete(roomId);
        }
    });


})
