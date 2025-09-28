import socketService from './socket.js';

let peerConnection;
let localStream;
let remoteStream;

const configuration = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' } // Google's public STUN server
    ]
};

const webRTC = {
    /**
     * Initializes the WebRTC connection process.
     * @param {string} recipientId - The user ID of the person to call.
     */
    async startCall(recipientId) {
        try {
            localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            // TODO: Display localStream in a video element

            peerConnection = new RTCPeerConnection(configuration);

            // Add local tracks to the connection
            localStream.getTracks().forEach(track => {
                peerConnection.addTrack(track, localStream);
            });

            // Handle incoming remote tracks
            peerConnection.ontrack = (event) => {
                remoteStream = event.streams[0];
                // TODO: Display remoteStream in another video element
            };

            // Listen for ICE candidates and send them to the other peer
            peerConnection.onicecandidate = (event) => {
                if (event.candidate) {
                    socketService.emitSignal({
                        to: recipientId,
                        type: 'ice-candidate',
                        payload: event.candidate,
                    });
                }
            };

            // Create an offer and send it
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);

            socketService.emitSignal({
                to: recipientId,
                type: 'offer',
                payload: offer,
            });

        } catch (error) {
            console.error("Error starting call:", error);
        }
    },

    // More functions will be needed to handle incoming offers, answers, and candidates
};

// Listen for signaling messages from the socket server
socketService.onSignal((data) => {
    // This is a simplified handler. A full implementation is more complex.
    switch(data.type) {
        case 'offer':
            // handleIncomingOffer(data.payload, data.from);
            break;
        case 'answer':
            // handleIncomingAnswer(data.payload);
            break;
        case 'ice-candidate':
            // handleNewICECandidate(data.payload);
            break;
    }
});


export default webRTC;
