<script>
  window.addEventListener('load', () => {
    setTimeout(() => {
      const menu = document.querySelector('.w-tab-menu');
      const active = document.querySelector('.w-tab-menu .w--current');
      const tabLinks = document.querySelectorAll('.w-tab-link');

      if (!active || !menu) return;

      const menuRect = menu.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();

      const pill = document.createElement('div');
      pill.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        height: ${activeRect.height}px;
        width: ${activeRect.width}px;
        transform: translate(${activeRect.left - menuRect.left}px, ${activeRect.top - menuRect.top}px);
        background: var(--Gray-100, #F1F5F9);
        border-radius: 6px;
        z-index: 0;
        pointer-events: none;
        transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                    width 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                    height 0.35s cubic-bezier(0.4, 0, 0.2, 1);
      `;

      menu.style.position = 'relative';
      menu.appendChild(pill);

      tabLinks.forEach(tab => {
        tab.style.position = 'relative';
        tab.style.zIndex = '1';
        tab.addEventListener('click', () => {
          const tabRect = tab.getBoundingClientRect();
          const mRect = menu.getBoundingClientRect();
          pill.style.width = tabRect.width + 'px';
          pill.style.height = tabRect.height + 'px';
          pill.style.transform = `translate(${tabRect.left - mRect.left}px, ${tabRect.top - mRect.top}px)`;
        });
      });

    }, 300);
  });
</script>
