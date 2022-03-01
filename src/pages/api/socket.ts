import { NextApiRequest, NextApiResponse } from 'next';
import { Server, ServerOptions } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

const SocketHandler: NextApiHandlerWithSocketIo = (_, res) => {
    if (res.socket.server.io) {
        global.isDev && console.log('Socket is already running');
    } else {
        global.isDev && console.log('Socket is initializing');
        const io = new Server(res.socket.server);
        res.socket.server.io = io;
        io.on('connection', (socket) => {
            socket.on('input-change', (msg) => {
                socket.broadcast.emit('update-input', msg);
            });
        });
    }
    res.end();
};

export default SocketHandler;

export type NextApiHandlerWithSocketIo = (
    req: NextApiRequest,
    res: Omit<NextApiResponse, 'socket'> & {
        readonly socket: NextApiResponse['socket'] & {
            server: Partial<ServerOptions> & {
                io: Server<
                    DefaultEventsMap,
                    DefaultEventsMap,
                    DefaultEventsMap,
                    any
                >;
            };
        };
    }
) => void | (Promise<void> & {});
