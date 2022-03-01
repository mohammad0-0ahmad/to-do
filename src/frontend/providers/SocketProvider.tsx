import React, { useEffect } from 'react';
import io from 'socket.io-client';

export let webSocket: ReturnType<typeof io>;

const SocketProvider: FCWC = ({ children }) => {
    useEffect(() => {
        socketInitializer();
        return () => {
            webSocket?.disconnect();
        };
    }, []);

    const socketInitializer = async () => {
        await fetch('/api/socket');
        webSocket = io();
        webSocket.on('connect', () => {
            global.isDev && console.log('web-socket: connected');
        });
    };

    return <>{children}</>;
};

export default SocketProvider;
