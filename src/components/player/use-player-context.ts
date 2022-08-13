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
  const token = (session as AppSession)?.user?.accessToken ?? "";
  const [active, setActive] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<Partial<Track>>(track);
  const [deviceId, setDeviceId] = useState<string>("");
  const [paused, setPaused] = useState<boolean>(false);
  const [player, setPlayer] = useState<Spotify.Player | undefined>(undefined);
  const [tracks, setTracks] = useState<Partial<[Track[], Track[]]>>([]);

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
        cb(token);
      },
      volume: 0.5,
    });

    setPlayer(spotPlayer);

    spotPlayer.addListener("ready", async ({ device_id }: any) => {
      setDeviceId(device_id);
      setTimeout(async () => {
        await fetcher("/me/player", false, {
          method: "PUT",
          body: {
            device_ids: [device_id],
            play: false,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }, 1000);
    });

    spotPlayer.addListener("not_ready", ({ device_id }: any) => {
      console.log("Device ID has gone offline", device_id);
    });

    spotPlayer.addListener("player_state_changed", async (state: any) => {
      if (!state) return;

      console.log({ state });

      setCurrentTrack(state.track_window.current_track);
      setTracks([
        state.track_window.previous_tracks,
        state.track_window.next_tracks,
      ]);
      setPaused(state.paused);

      spotPlayer.getCurrentState().then((state: any) => {
        setActive(!!state);
      });
    });
    spotPlayer.connect();
  }, [token, waitForPlayer]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    initPlayer();
  }, []);

  const togglePlay = useCallback(async () => {
    await player?.togglePlay();
  }, [player]);

  const previous = useCallback(async () => {
    await player?.previousTrack();
  }, [player]);

  const next = useCallback(async () => {
    await player?.nextTrack();
  }, [player]);

  const shuffle = useCallback(async () => {
    // TODO: add shuffle toggle
    await fetcher("/me/player/shuffle", false, {
      method: "PUT",
      body: {
        state: true,
        device_id: deviceId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, [deviceId, token]);

  return {
    active,
    currentTrack,
    next,
    paused,
    player,
    previous,
    shuffle,
    tracks,
    togglePlay,
  };
};
