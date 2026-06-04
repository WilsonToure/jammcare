import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import socket from '../socket'

export default function CallPage(){
  const { id } = useParams();
  const localVideoRef = useRef<HTMLVideoElement|null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement|null>(null);

  useEffect(()=>{
    // basic signaling handler
    socket.emit('join', `call-${id}`);
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      // In a real app, create RTCPeerConnection and use socket signaling
    }).catch(()=>{})
  }, [id])

  return (
    <div className="p-8">
      <h2>Call {id}</h2>
      <div>
        <video ref={localVideoRef} autoPlay playsInline muted style={{width:300}} />
        <video ref={remoteVideoRef} autoPlay playsInline style={{width:300}} />
      </div>
    </div>
  )
}
