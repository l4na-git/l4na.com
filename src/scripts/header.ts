document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector<HTMLElement>('header.site-header');
  const mobileNav = document.getElementById('mobile-nav') as HTMLElement | null;
  const btn = document.getElementById('mobile-menu-button') as HTMLElement | null;
  if (!header || !btn) return;

  const menuIcon = btn.querySelector<HTMLElement>('.menu-icon');
  const closeIcon = btn.querySelector<HTMLElement>('.close-icon');

  let isMobileOpen = false;

  const addClasses = (...cls: string[]) => header.classList.add(...cls);
  const removeClasses = (...cls: string[]) => header.classList.remove(...cls);

  // スクロール量に応じてヘッダーの背景を切り替える
  const handleScroll = () => {
    if (window.scrollY > 10) {
      removeClasses('bg-transparent');
      addClasses('bg-card/80', 'backdrop-blur-md', 'border-b', 'border-border', 'shadow-sm');
    } else {
      removeClasses('bg-card/80', 'backdrop-blur-md', 'border-b', 'border-border', 'shadow-sm');
      addClasses('bg-transparent');
    }
  };

  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });

  // モバイルメニューの開閉
  btn.addEventListener('click', () => {
    isMobileOpen = !isMobileOpen;
    if (mobileNav) mobileNav.classList.toggle('hidden', !isMobileOpen);
    btn.setAttribute('aria-expanded', String(isMobileOpen));
    if (menuIcon && closeIcon) {
      menuIcon.classList.toggle('hidden', isMobileOpen);
      closeIcon.classList.toggle('hidden', !isMobileOpen);
    }
  });

  // モバイルメニュー内リンククリック時に閉じる
  if (mobileNav) {
    mobileNav.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const a = target.closest('a');
      if (a) {
        isMobileOpen = false;
        mobileNav.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
        if (menuIcon && closeIcon) {
          menuIcon.classList.remove('hidden');
          closeIcon.classList.add('hidden');
        }
      }
    });
  }
});
