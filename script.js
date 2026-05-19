window.addEventListener('DOMContentLoaded', () => {
  const hasBootSequence = Boolean(document.querySelector('.boot-sequence'));
  const readyDelay = hasBootSequence ? 2350 : 0;
  const homeReadyDelay = hasBootSequence ? 2680 : 420;

  window.setTimeout(() => {
    requestAnimationFrame(() => {
      document.body.classList.add('is-ready');
    });
  }, readyDelay);

  if (document.body.classList.contains('page-home')) {
    window.setTimeout(() => {
      document.body.classList.add('home-cover-ready');
    }, homeReadyDelay);
  }

  if (hasBootSequence) {
    window.setTimeout(() => {
      document.body.classList.add('is-booted');
    }, 2600);
  }

  const autoplayVideo = document.querySelector('[data-autoplay-on-load]');
  if (autoplayVideo instanceof HTMLVideoElement) {
    autoplayVideo.play().catch(() => {});
  }

  const scrollVideos = document.querySelectorAll('[data-play-on-scroll]');
  if (scrollVideos.length) {
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const video = entry.target;
          if (video instanceof HTMLVideoElement) {
            video.play().catch(() => {});
            videoObserver.unobserve(video);
          }
        });
      },
      {
        threshold: 0.45,
      }
    );

    scrollVideos.forEach((video) => {
      videoObserver.observe(video);
    });
  }
});

const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealElements.forEach((element) => {
  if (!element.classList.contains('reveal--visible')) {
    observer.observe(element);
  }
});
