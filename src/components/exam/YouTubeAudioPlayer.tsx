"use client";

import { useEffect, useRef } from "react";

interface YouTubeAudioPlayerProps {
    youtubeId: string;
    isPlaying: boolean;
    onEnded?: () => void;
}

declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
        YT: any;
    }
}

export function YouTubeAudioPlayer({ youtubeId, isPlaying, onEnded }: YouTubeAudioPlayerProps) {
    const playerRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load YouTube IFrame API
        if (!window.YT) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

            window.onYouTubeIframeAPIReady = () => {
                initializePlayer();
            };
        } else {
            initializePlayer();
        }

        function initializePlayer() {
            if (playerRef.current) {
                playerRef.current.destroy();
            }

            playerRef.current = new window.YT.Player(containerRef.current, {
                height: "0",
                width: "0",
                videoId: youtubeId,
                playerVars: {
                    autoplay: 0,
                    controls: 0,
                    disablekb: 1,
                    fs: 0,
                    rel: 0,
                    modestbranding: 1
                },
                events: {
                    onStateChange: (event: any) => {
                        if (event.data === window.YT.PlayerState.ENDED) {
                            onEnded?.();
                        }
                    }
                }
            });
        }

        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
                playerRef.current = null;
            }
        };
    }, [youtubeId, onEnded]);

    useEffect(() => {
        if (!playerRef.current || !playerRef.current.playVideo) return;

        if (isPlaying) {
            playerRef.current.playVideo();
        } else {
            playerRef.current.pauseVideo();
        }
    }, [isPlaying]);

    return (
        <div className="hidden pointer-events-none overflow-hidden h-0 w-0">
            <div ref={containerRef} />
        </div>
    );
}
