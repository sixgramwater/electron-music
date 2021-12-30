import React, { useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'renderer/hooks/hooks';
// import { useQuery } from 'react-query';
import { fetchMusicUrl } from 'renderer/api';
const AudioPlayer: React.FC = () => {
  const dispatch = useAppDispatch();
  const playingState = useAppSelector(state=>state.music.playingState);
  const curMusic = useAppSelector(state=>state.music.curMusic);
  const curMusicId = useAppSelector(state=>state.music.curMusicId);
  // const id = 85963100;
  const audioRef: any = useRef(null);
  const audioUrl = curMusic?.musicUrl ? curMusic?.musicUrl : '';
  const seekTime = useAppSelector(state=>state.music.seekTime);
  useEffect(()=>{
    if(!curMusic?.musicUrl) {
      fetchMusicUrl(curMusic!.id).then(para => {
        console.log(para.data.data[0].url);
        dispatch({
          type: 'music/setCurMusic',
          payload: {
            ...curMusic,
            musicUrl: para.data.data[0].url,
          }
        });

      })
    }
  }, [curMusic?.id]);
  // const result = useQuery('musicUrl', ()=>fetchMusicUrl(curMusic?curMusic.id:85963100), {
  //   enabled: curMusic?.musicUrl !== undefined,
  // });

  // const audioUrl = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
  useEffect(() => {
    if(playingState === 'playing') {
      play();
    } else if(playingState === 'paused') {
      pause();
    } else {
      stop();
    }
  }, [playingState]);

  useEffect(()=> {
    if(audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  }, [seekTime])
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
      dispatch({
        type: 'music/setIsPlaying',
        payload: true
      })
      audioRef.current.play();
    }
    // audioRef.current?.play();
  }
  const pause = () => {
    if(audioRef.current) {
      dispatch({
        type: 'music/setIsPlaying',
        payload: false
      })
      audioRef.current.pause();
    }
  }
  const stop = () => {
    // if(audioRef.current) {
    //   audioRef.current.stop();
    // }
  }
  const onTimeUpdate: React.ReactEventHandler<HTMLAudioElement> = (e) => {
    // console.log(audioRef.current.currentTime);
    dispatch({
      type: 'music/setCurTime',
      payload: audioRef.current.currentTime,
    })
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

