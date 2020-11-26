import React, {useEffect, useRef, useState} from "react";
import io from "socket.io-client";
import Peer from "simple-peer";


const WebRTCSimperPeer = () =>{
    const [stream, setStream] = useState({});
    const [receiveCall, setReceiveCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [currentUserID, setCurrentUserID] = useState("");
    const [usersid, setUsersid] = useState({});
    const [callerSignal, setCallSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);

    const userVideo = useRef();
    const peerVideo = useRef();
    const socket = useRef();
    const endpoint = 'localhost:5000';

    useEffect( () =>{
        socket.current = io(endpoint);
        navigator.mediaDevices.getUserMedia({video: true, audio:true}).then(stream =>{
            setStream(stream);
            if(userVideo.current){
                userVideo.current.srcObject = stream;
            }
        })

        socket.current.on("hey", (data)=>{
            setReceiveCall(true);
            setCaller(data.from);
            setCallSignal(data.signal);
        })

        socket.current.on("allUsersid", (usersid) => {
            setUsersid(usersid);
            console.log("all users", usersid)

        })

        socket.current.on("currentuserId", (id) => {
            setCurrentUserID(id);
        })


    }, []);


    function callPeer(id) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            config: {
                iceServers: [
                    //stun
                    {
                        urls: "stun:numb.viagenie.ca",
                        username: "d19125334@mytudublin.ie",
                        credential: "d19125334"
                    },
                    //turn
                    {
                        urls: "turn:numb.viagenie.ca",
                        username: "d19125334@mytudublin.ie",
                        credential: "d19125334"
                    }
                ]
            },

            stream: stream,
        });

        peer.on("signal", data => {
            socket.current.emit("callUser", { userToCall: id, signalData: data, from: currentUserID })
        })

        peer.on("stream", stream => {
            if (peerVideo.current) {
                peerVideo.current.srcObject = stream;
            }
        });

        socket.current.on("callAccepted", signal => {
            setCallAccepted(true);
            peer.signal(signal);
        })
    }

    function acceptCall(){

        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        });

        peer.on("signal", data=>{
            socket.current.emit("acceptCall", {signal: data, to: caller})
        })

        peer.on("stream", stream =>{
            peerVideo.current.srcObject = stream;
        })

        peer.signal(callerSignal);
    }

    let UserVideo;
    if (stream) {
        UserVideo = (
            <video playsInline muted ref={userVideo} autoPlay />
        );
    }

    let PeerVideo;
    if (callAccepted) {
        PeerVideo = (
            <video playsInline ref={peerVideo} autoPlay />
        );
    }

    let incomingCall;
    if (receiveCall) {
        incomingCall = (
            <div>
                <h1>{caller} is calling you</h1>
                <button onClick={acceptCall}>Accept</button>
            </div>
        )
    }

    // const keyusersid = usersid.map((key, idex) =>)


    return(
        <div>
        <div>
            {UserVideo}
            {PeerVideo}
        </div>
        <div>

            {Object.keys(usersid).map(key => {

                if (key === currentUserID) {
                    return null;
                } else {

                    return (
                        <button onClick={() => callPeer(key)}>Call {key}</button>
                    );
                }
            })

            }
        </div>
        <div>
            {incomingCall}
        </div>
        </div>
    )

}

export default  WebRTCSimperPeer;
