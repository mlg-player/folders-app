
import socketClient from "../socketClient";

declare global {
    interface Window {
        socket: socketClient
    }
}

const channels = ['folders', 'connection']
const socket = () => {
  const socket = new socketClient().channels(channels).open();
  
  window.socket = socket;

  socket.listener('connection', () => {
    console.log('event come')
  })
  socket.listener('folders', (res: any) => {
    console.log(res)
  })
  return () => {
    socket.close()
  }
};
export default socket
