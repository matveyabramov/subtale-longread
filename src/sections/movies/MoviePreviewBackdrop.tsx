import { useEffect, useRef, useState } from 'react';
import { movieCases, type MovieCaseId, type MovieMedia } from './model';
import type { useMoviePreview } from './useMoviePreview';
import styles from './MoviesSection.module.css';

type PreviewController = ReturnType<typeof useMoviePreview>;

export function MoviePreviewBackdrop({ controller }: { controller: PreviewController }) {
  const [displayed, setDisplayed] = useState<MovieCaseId | null>(null);
  const media = controller.preview?.media;
  useEffect(() => {
    if (!media) return;
    let cancelled = false;
    const poster = new Image();
    poster.src = media.poster;
    // Keep the previous frame until the next poster is ready, including slow networks.
    void poster.decode().then(() => { if (!cancelled) setDisplayed(media.id); }).catch(() => {
      if (!cancelled) setDisplayed(media.id);
    });
    return () => { cancelled = true; };
  }, [media]);
  return (
    <div className={styles.previewClip} aria-hidden="true">
      <div className={styles.preview} data-movie-preview data-visible={!!controller.preview}>
        {movieCases.map((item) => <PreviewLayer key={item.id} media={item} controller={controller}
          active={displayed === item.id} autoplay={!!controller.preview && displayed === controller.preview.media.id && controller.preview.autoplay} />)}
        <div className={styles.previewShade} />
      </div>
    </div>
  );
}

function PreviewLayer({ media, controller, active, autoplay }: {
  media: MovieMedia; controller: PreviewController; active: boolean; autoplay: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const { videos } = controller;
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    videos.current.set(media.id, video);
    return () => { video.pause(); video.removeAttribute('src'); video.load(); videos.current.delete(media.id); };
  }, [media, videos]);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let cancelled = false;
    let release: ReturnType<typeof setTimeout> | undefined;
    if (active && autoplay) {
      video.muted = true;
      if (video.getAttribute('src') !== media.video) video.src = media.video;
      void video.play().catch(() => { if (!cancelled) setPlaying(false); });
    } else {
      video.pause();
      // Hold the paused frame through its exit, then release Safari's decoder/buffer.
      release = setTimeout(() => {
        video.removeAttribute('src');
        video.load();
        setPlaying(false);
      }, 200);
    }
    return () => { cancelled = true; clearTimeout(release); video.pause(); };
  }, [active, autoplay, media]);
  return (
    <div className={styles.previewLayer} data-preview-film={media.id} data-active={active}
      style={{ backgroundImage: `url("${media.poster}")` }}>
      <video ref={videoRef} muted loop playsInline preload="none" data-playing={playing}
        onPlay={(event) => controller.guardPlayback(event.currentTarget, media)}
        onPlaying={(event) => {
          controller.guardPlayback(event.currentTarget, media);
          setPlaying(!event.currentTarget.paused);
        }} onError={() => setPlaying(false)} />
    </div>
  );
}
