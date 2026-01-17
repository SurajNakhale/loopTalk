import { useRef } from "react";
import Chatwindow from "./Chatwindow"


function App() {
  const inputref = useRef<HTMLInputElement | null>(null);

  const joinRoom = () => {

  }
  const generateCode = () => {

  }

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="border-x-3 border-y-1 p-2 flex-col justify-between bg-yellow-100 border-yellow-700 rounded ">
            <h2 className="text-3xl font-bold text-orange-600 text-center">Join Room</h2>
          <div className="mt-38">
            <input className="flex-1 border-slate-500 border rounded pt-2 px-4 text-center bg-slate-200 font-light focus:outline-none"
                    type="password" 
                    placeholder="Enter room code.."
                    ref={inputref} />
            <button className="ml-2 border-slate-500 border pt-2 px-4 rounded bg-green-200 hover:bg-green-400 font-light" 
                    onClick={joinRoom}>Join</button>
          </div>
            <div className="justify-center">
              <span></span>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                      onClick={generateCode} 
                      className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </div>
            </div>
        </div>  
      </div>
  

    {/* <Chatwindow /> */}
    </>
  )
}

export default App
