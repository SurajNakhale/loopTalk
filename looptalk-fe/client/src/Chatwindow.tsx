import { useEffect, useRef, useState } from 'react';

function Chatwindow() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  let [message, setMessage] = useState<string[]>(["hi there", "helllo"]);
  

  useEffect(()=>{
    const ws = new WebSocket('ws://localhost:8080');
    setSocket(ws);

    ws.onmessage = (event)=> {
      const parsedMsg = JSON.parse(event.data)
      if(parsedMsg.type == "chat")
      setMessage(prevMsg => [...prevMsg, parsedMsg.payload.message]);

    }

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "red"
        }
      }))
    }

  }, []);


  function sendmsg(){
    if(!socket || !inputRef.current) return;
     const msg = inputRef.current.value;
    socket.send(JSON.stringify({
          type: "chat",
          payload: {
            message: msg
          }
    }));

  }

  return (
    <>
    <div className='justify-center'>
      <h1 className="text-3xl font-bold text-amber-600 text-center">LoopTalk</h1>
    </div>
    <div className='felx-col justify-between'>
      <div className=' h-[90vh]'>
        {message.map((m) => (
          <div> {m} </div>
        ))}
      </div>

      <div className='m-1'>
        <div className='flex justify-between'>
          <input ref={inputRef} className="flex-1 border-slate-500 border rounded pt-2 px-4 text-center bg-slate-200 font-light focus:outline-none" type="text" placeholder='message.....' />
          <button onClick={sendmsg} className='ml-1 border-slate-500 border pt-2 px-4 rounded bg-green-200 hover:bg-green-400 font-light'>
            Send</button>
        </div>
      </div>
    </div>
      
      
    </>
  )
}

export default Chatwindow