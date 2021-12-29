import React, { useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'renderer/hooks/hooks';
const AudioPlayer: React.FC = () => {
  const dispatch = useAppDispatch();
  const playingState = useAppSelector(state=>state.music.playingState);
  const id = 85963100;
  const audioRef: any = useRef(null);
  const audioUrl = `http://m7.music.126.net/20211228221145/6765b00935e61713cbe49a2e751eb75b/ymusic/550b/070b/0109/ba97a553f50ac1a259c26c37926061f5.mp3`
  // useEffect(() => {
  //   dispatch({
  //     type: 'music/setAudioRef',
  //     payload: audioRef.current
  //   })
  // }, []);
  useEffect(() => {
    if(playingState === 'playing') {
      play();
    } else if(playingState === 'paused') {
      pause();
    } else {
      stop();
    }
  }, [playingState])
  const onEnded = () => {
    console.log('onend');
  }
  const onPlay = () => {
    console.log('onplay');
  }
  const onCanPlay = () => {
    console.log('onCanPlay')
  }
  const play = () => {
    if(audioRef.current) {
      audioRef.current.play();
    }
    // audioRef.current?.play();
  }
  const pause = () => {
    if(audioRef.current) {
      audioRef.current.pause();
    }
  }
  const stop = () => {
    // if(audioRef.current) {
    //   audioRef.current.stop();
    // }
  }
  const onTimeUpdate: React.ReactEventHandler<HTMLAudioElement> = (e) => {
    console.log(e);
  }
  return (
    <audio
      id="audio"
      ref={audioRef}
      src={audioUrl}
      onEnded={onEnded}
      onPlay={onPlay}
      onCanPlay={onCanPlay}
      onTimeUpdate={onTimeUpdate}
      // crossOrigin='use-credentials'
    />
  )
}

export default AudioPlayer;

