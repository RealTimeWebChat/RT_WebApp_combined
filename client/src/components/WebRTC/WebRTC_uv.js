import React, {useState, useRef,useEffect} from "react";

// const peersjs = require("https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js");


let socket;
const videoGrid = document.getElementById('video-grid');
const myVideo = document.getElementById('myVideo');
// myVideo.muted = true;

const peers = {};


// function addVideoStream(video, stream) {
//     video.sortObjects = stream
//     video.addEventListener('loadedmetadata',() => {
//         video.play()
//     })
//
//     // videoGrid.append(video)
// }

const WebRTC =({name, room,endpoint}) =>{
    //initial setstream
    const [stream, setStream] = useState();
    const userVideo = useRef();

    useEffect(()=>{
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then(stream =>{
            setStream(stream);
            if(userVideo.current){
                userVideo.current.srcObject = stream;
            }

            // addVideoStream(myVideo, stream)
            let start = document.getElementById('btnStart');
            let stop = document.getElementById('btnStop');
            let vidSave = document.getElementById('vid2');
            //let vidUpload = document.getElementById('btnUpload');
            //let mediaRecorder = new MediaRecorder(stream);
            let chunks = [];
            let mRecorder, screenStream, voiceStream, fullStream;
            const audioToggle = document.getElementById('audioToggle');
            const micAudioToggle = document.getElementById('micAudioToggle');

            const mergeAudioStreams = (screenStream, voiceStream) => {
                const context = new AudioContext();
                const destination = context.createMediaStreamDestination();
                let hasDesktop = false;
                let hasVoice = false;
                if (screenStream && screenStream.getAudioTracks().length > 0) {
                    // If you don't want to share Audio from the desktop it should still work with just the voice.
                    const source1 = context.createMediaStreamSource(screenStream);
                    const desktopGain = context.createGain();
                    desktopGain.gain.value = 0.7;
                    source1.connect(desktopGain).connect(destination);
                    hasDesktop = true;
                }

                if (voiceStream && voiceStream.getAudioTracks().length > 0) {
                    const source2 = context.createMediaStreamSource(voiceStream);
                    const voiceGain = context.createGain();
                    voiceGain.gain.value = 0.7;
                    source2.connect(voiceGain).connect(destination);
                    hasVoice = true;
                }

                return (hasDesktop || hasVoice) ? destination.stream.getAudioTracks() : [];
            };

            async function startRecording() {
                const audio = audioToggle.checked || true;
                const mic = micAudioToggle.checked || true;

                screenStream = await navigator.mediaDevices.getDisplayMedia({
                    video: { mediaSource: "screen" },
                    audio: audio
                });

                if (mic === true) {
                    voiceStream = await navigator.mediaDevices.getUserMedia({ video: false, audio: mic });
                }

                const tracks = [
                    ...screenStream.getVideoTracks(),
                    ...mergeAudioStreams(screenStream, voiceStream)
                ];

                fullStream = new MediaStream(tracks);
                mRecorder = new MediaRecorder(fullStream);

                //const chunks = [];
                mRecorder.ondataavailable = function(ev) {
                    chunks.push(ev.data);
                }

                mRecorder.onstop = (ev)=>{
                    let blob = new Blob(chunks, { 'type' : 'video/mp4;' });
                    chunks = [];
                    let videoURL = window.URL.createObjectURL(blob);
                    vidSave.src = videoURL;
                }
                mRecorder.start();
            }

            start.addEventListener('click', (ev)=>{
                //mRecorder.start();
                startRecording();
                //console.log(mRecorder.state);
            })
            stop.addEventListener('click', (ev)=>{
                mRecorder.stop();
                //console.log(mRecorder.state);
            });

        })
    }, []);

    let UserVideo;
    if (stream) {
        UserVideo = (
            <video playsInline muted ref={userVideo} autoPlay/>
        );
    }

    return(
        <div>
            <div>
                <button id="btnStart">START RECORDING</button>
                <button id="btnStop">STOP RECORDING</button>
                <br/>
                <button id="btnUpload">UPLOAD RECORDING</button>
            </div>
            <div id="video-grid">
                {UserVideo}
            }
            </div>
            <video id="vid2" controls></video>
            <div>
                <input type="checkbox" id="audioToggle"/>
                <label htmlFor="audioToggle">Capture Audio-Video from Desktop</label>
                <input type="checkbox" id="micAudioToggle"/>
                <label htmlFor="micAudioToggle">Capture Audio from Microphone</label>
            </div>
        </div>
    )
}

export default WebRTC;