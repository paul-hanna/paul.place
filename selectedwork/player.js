// Load third-party players only when the visitor chooses to watch.
document.querySelectorAll('.player').forEach(player => {
  player.querySelector('button').addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = player.dataset.src;
    iframe.title = player.dataset.title;
    iframe.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
    iframe.allowFullscreen = true;
    player.replaceChildren(iframe);
    iframe.focus();
  });
});
