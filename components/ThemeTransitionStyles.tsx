"use client";

export default function ThemeTransitionStyles() {
  return (
    <style jsx global>{`
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      ::view-transition-group(root) {
        animation-duration: 600ms;
      }
      ::view-transition-old(root),
      ::view-transition-new(root) {
        animation: none;
        mix-blend-mode: normal;
      }

      @keyframes theme-expand {
        from {
          clip-path: circle(0px at var(--theme-x) var(--theme-y));
        }
        to {
          clip-path: circle(
            var(--theme-radius) at var(--theme-x) var(--theme-y)
          );
        }
      }
      @keyframes theme-shrink {
        from {
          clip-path: circle(
            var(--theme-radius) at var(--theme-x) var(--theme-y)
          );
        }
        to {
          clip-path: circle(0px at var(--theme-x) var(--theme-y));
        }
      }

      [data-theme-transition="expand"]::view-transition-old(root) {
        z-index: 1;
        animation: none;
      }
      [data-theme-transition="expand"]::view-transition-new(root) {
        z-index: 2;
        animation: theme-expand 600ms ease-in-out forwards;
      }
      [data-theme-transition="shrink"]::view-transition-old(root) {
        z-index: 2;
        animation: theme-shrink 600ms ease-in-out forwards;
      }
      [data-theme-transition="shrink"]::view-transition-new(root) {
        z-index: 1;
        animation: none;
      }
    `}</style>
  );
}
