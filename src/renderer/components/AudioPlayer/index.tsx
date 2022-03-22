import React, { useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'renderer/hooks/hooks';
// import { useQuery } from 'react-query';
import { fetchMusicUrl } from 'renderer/api';
const AudioPlayer: React.FC = () => {
  const dispatch = useAppDispatch();
  const playingState = useAppSelector((state) => state.music.playingState);
  const curMusic = useAppSelector((state) => state.music.curMusic);
  // const curMusicId = useAppSelector((state) => state.music.curMusicId);
  // const id = 85963100;
  const audioRef: any = useRef(null);
  const audioUrl = curMusic?.musicUrl ? curMusic?.musicUrl : '';
  const seekTime = useAppSelector((state) => state.music.seekTime);
  const volume = useAppSelector((state) => state.music.volume);
  const isPlaying = useAppSelector(state => state.music.isPlaying);
  useEffect(() => {
    const memMusic = localStorage.getItem('lastPlayedMusic');
    if(memMusic) {
      const result = JSON.parse(memMusic);
      dispatch({
        type: 'music/setCurMusic',
        payload: result
      });
      dispatch({
        type: 'music/setDuration',
        payload: (result.duration / 1000) >> 0,
      });
    }
  }, [])
  // const [needToPlay, setNeedToPlay] = useState(false);
  useEffect(() => {
    if(isPlaying) {
      dispatch({
        type: 'music/setIsPlaying',
        payload: false,
      })
    }
    if (!curMusic?.musicUrl) {
      fetchMusicUrl(curMusic!.id).then((para) => {
        const fetchedUrl = para.data.data[0].url;
        if(!fetchedUrl) {
          dispatch({
            type: 'app/setToastContent',
            payload: '无法加载歌曲'
          })
        }
        // console.log(para.data.data[0].url);
        dispatch({
          type: 'music/setCurMusic',
          payload: {
            ...curMusic,
            musicUrl: para.data.data[0].url,
          },
        });
        localStorage.setItem('lastPlayedMusic', JSON.stringify({
          ...curMusic,
          musicUrl: fetchedUrl,
        }))
      });
    }
  }, [curMusic?.id]);
  // const result = useQuery('musicUrl', ()=>fetchMusicUrl(curMusic?curMusic.id:85963100), {
  //   enabled: curMusic?.musicUrl !== undefined,
  // });

  // const audioUrl = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
  useEffect(() => {
    if (playingState === 'playing') {
      if(audioUrl) {
        play()
      }
      // else {
      //   dispatch({
      //     type:'app/setToastContent',
      //     payload: ''
      //   })
      // }
    } else if (playingState === 'paused') {
      pause();
    } else {
      stop();
    }
  }, [playingState]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  }, [seekTime]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  const onEnded = () => {
    console.log('onend');
    pause();
  };
  const onPlay = () => {
    console.log('onplay');
    dispatch({
      type: 'music/setIsPlaying',
      payload: true
    })
  };
  const onCanPlay = () => {
    if(playingState === 'playing') {
      play();
    }
    // play();
    // console.log('onCanPlay');
  };
  const play = () => {
    if (audioRef.current) {
      // dispatch({
      //   type: 'music/setIsPlaying',
      //   payload: true,
      // });
      audioRef.current.play();
    }
    // audioRef.current?.play();
  };
  const onPause = () => {
    dispatch({
      type: 'music/setIsPlaying',
      payload: false,
    });
  }
  const pause = () => {
    if (audioRef.current) {
      // dispatch({
      //   type: 'music/setIsPlaying',
      //   payload: false,
      // });
      audioRef.current.pause();
    }
  };
  const stop = () => {
    // if(audioRef.current) {
    //   audioRef.current.stop();
    // }
  };
  const onTimeUpdate: React.ReactEventHandler<HTMLAudioElement> = (e) => {
    // console.log(audioRef.current.currentTime);
    dispatch({
      type: 'music/setCurTime',
      payload: audioRef.current.currentTime,
    });
  };
  return (
    <audio
      id="audio"
      ref={audioRef}
      src={audioUrl}
      onEnded={onEnded}
      onPlay={onPlay}
      onPause={onPause}
      onCanPlay={onCanPlay}
      onTimeUpdate={onTimeUpdate}
      // onPlaying={}
      // crossOrigin='use-credentials'
    />
  );
};

export default AudioPlayer;
