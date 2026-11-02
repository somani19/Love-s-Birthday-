import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Disc } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface AudioControlsProps {
  onInteract?: () => void;
}

export const AudioControls: React.FC<AudioControlsProps> = ({ onInteract }) => {
  const [musicOn, setMusicOn] = useState(soundManager.musicEnabled);
  const [sfxOn, setSfxOn] = useState(soundManager.sfxEnabled);

  const toggleMusic = () => {
    onInteract?.();
    const state = soundManager.toggleMusic();
    setMusicOn(state);
    if (state) {
      soundManager.playSparkle();
    }
  };

  const toggleSfx = () => {
    onInteract?.();
    const state = soundManager.toggleSfx();
    setSfxOn(state);
    if (state) {
      soundManager.playTwinkle();
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Background Birthday Celesta Melody Button */}
      <button
        onClick={toggleMusic}
        type="button"
        aria-label={musicOn ? 'Mute Background Music' : 'Play Background Music'}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border backdrop-blur-md cursor-pointer ${
          musicOn
            ? 'bg-pink-500/20 text-pink-200 border-pink-400/40 shadow-[0_0_15px_rgba(244,114,182,0.3)]'
            : 'bg-white/5 text-slate-400 border-white/10 hover:text-slate-200 hover:bg-white/10'
        }`}
        title="Background Birthday Music"
      >
        <Music className={`w-3.5 h-3.5 ${musicOn ? 'animate-bounce text-pink-400' : ''}`} />
        <span className="hidden sm:inline">
          {musicOn ? 'Music ON' : 'Music OFF'}
        </span>
        {musicOn && (
          <span className="flex items-end gap-0.5 h-3">
            <span className="w-0.5 bg-pink-400 h-2.5 animate-pulse" />
            <span className="w-0.5 bg-pink-300 h-3 animate-pulse" style={{ animationDelay: '0.2s' }} />
            <span className="w-0.5 bg-pink-400 h-1.5 animate-pulse" style={{ animationDelay: '0.4s' }} />
          </span>
        )}
      </button>

      {/* Sound Effects Toggle */}
      <button
        onClick={toggleSfx}
        type="button"
        aria-label={sfxOn ? 'Mute Sound Effects' : 'Enable Sound Effects'}
        className={`p-2 rounded-full text-xs transition-all duration-300 border backdrop-blur-md cursor-pointer ${
          sfxOn
            ? 'bg-purple-500/20 text-purple-200 border-purple-400/40 shadow-[0_0_12px_rgba(192,132,252,0.3)]'
            : 'bg-white/5 text-slate-400 border-white/10 hover:text-slate-200 hover:bg-white/10'
        }`}
        title={sfxOn ? 'Sound Effects Active' : 'Sound Effects Muted'}
      >
        {sfxOn ? <Volume2 className="w-4 h-4 text-purple-300" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
      </button>
    </div>
  );
};
