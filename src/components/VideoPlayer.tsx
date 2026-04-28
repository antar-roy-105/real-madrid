"use client";

import { useState, useRef } from "react";

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    setIsPlaying(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 100);
  };

  return (
    <div className="w-full bg-black py-8 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        {!isPlaying ? (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl bg-gray-900 flex items-center justify-center">
            <button
              onClick={handlePlayClick}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              See the Magic
            </button>
          </div>
        ) : (
          <video
            ref={videoRef}
            className="w-full h-auto rounded-lg shadow-2xl"
            controls
            controlsList="nodownload"
          >
            <source 
              src="/videos/WhatsApp Video 2026-04-20 at 14.20.22.mp4" 
              type="video/mp4" 
            />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
}
