import { AppSession, fetcher, Track } from '@/utils';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
} as Track;

export const usePlayerContext = () => {
  const { data: session } = useSession();
  const [paused, setPaused] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<Partial<Track>>(track);
  const [player, setPlayer] = useState<Spotify.Player | undefined>(undefined);

  const waitForPlayer = useCallback(async (): Promise<typeof Spotify> => {
    (window as any).onSpotifyWebPlaybackSDKReady = () => {};

    return new Promise((resolve) => {
      if ((window as any).Spotify) {
        resolve((window as any).Spotify);
      } else {
        (window as any).onSpotifyWebPlaybackSDKReady = () => {
          resolve((window as any).Spotify);
        };
      }
    });
  }, []);

  const initPlayer = useCallback(async () => {
    const { Player } = await waitForPlayer();
    const spotPlayer = new Player({
      name: "slick-tunes",
      getOAuthToken: (cb: any) => {
        cb((session as any)?.user?.accessToken);
      },
      volume: 0.5,
    });

    setPlayer(spotPlayer);

    spotPlayer.addListener("ready", async ({ device_id }: any) => {
      setTimeout(async () => {
        await fetcher("/me/player", false, {
          method: "PUT",
          body: {
            device_ids: [device_id],
            play: false,
          },
          headers: {
            Authorization: `Bearer ${
              (session as AppSession)?.user?.accessToken ?? ""
            }`,
          },
        });
      }, 1000);
    });

    spotPlayer.addListener("not_ready", ({ device_id }: any) => {
      console.log("Device ID has gone offline", device_id);
    });

    spotPlayer.addListener("player_state_changed", async (state: any) => {
      if (!state) return;

      setCurrentTrack(state.track_window.current_track);
      setPaused(state.paused);

      spotPlayer.getCurrentState().then((state: any) => {
        setActive(!!state);
      });
    });
    spotPlayer.connect();
  }, [session, waitForPlayer]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    initPlayer();
  }, []);

  return {
    active,
    player,
    paused,
    currentTrack,
  };
};