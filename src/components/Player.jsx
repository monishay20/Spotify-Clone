import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { PlayContext } from '../context/PlayerContext';

const Player = () => {
  const { seekBar, seekBg, playStatus, play, pause, track, time, previous, next, seekSong } = useContext(PlayContext);

  return (
    <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
      {/* Left Section */}
      <div className='hidden lg:flex items-center gap-4'>
        <img className='w-12' src={track.image} alt={track.name} />
        <div>
          <p>{track.name}</p>
          <p>{track.desc}</p>
        </div>
      </div>

      {/* Center Section */}
      <div className='flex flex-col items-center gap-1 m-auto'>
        <div className='flex gap-4'>
          <img className='w-4 cursor-pointer' src={assets.shuffle_icon} alt='shuffle' />
          <img onClick={previous} className='w-4 cursor-pointer' src={assets.prev_icon} alt='prev' />
          
          {playStatus
            ? <img onClick={pause} className='w-4 cursor-pointer' src={assets.pause_icon} alt='pause' />
            :
            <img onClick={play} className='w-4 cursor-pointer' src={assets.play_icon} alt='play' />
            }

          <img onClick={next} className='w-4 cursor-pointer' src={assets.next_icon} alt='next' />
          <img className='w-4 cursor-pointer' src={assets.loop_icon} alt='loop' />
        </div>

        <div className='flex items-center gap-5'>
          <p>{time.currentTime.minute}:{time.currentTime.second}</p>
          <div ref={seekBg} onClick={seekSong} className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
            <hr ref={seekBar} className='h-1 border-none w-0 bg-green-800 rounded-full' />
          </div>
          <p>{time.totalTime.minute}:{time.totalTime.second}</p>
        </div>
      </div>

      {/* Right Section */}
      <div className='hidden lg:flex items-center gap-2 opacity-75'>
        <img className='w-4' src={assets.plays_icon} alt='plays' />
        <img className='w-4' src={assets.mic_icon} alt='mic' />
        <img className='w-4' src={assets.queue_icon} alt='queue' />
        <img className='w-4' src={assets.speaker_icon} alt='speaker' />
        <img className='w-4' src={assets.volume_icon} alt='volume' />
        <div className='w-20 bg-slate-50 h-1 rounded'></div>
        <img className='w-4' src={assets.mini_player_icon} alt='mini player' />
        <img className='w-4' src={assets.zoom_icon} alt='zoom' />
      </div>
    </div>
  );
};

export default Player;

