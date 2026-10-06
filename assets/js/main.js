/* Fridge Bot site behaviour: theme toggle, mobile menu, active nav link, scroll reveal,
   waitlist forms, FAQ search and the app demo. Every block checks for its own markup. */
(function () {
  var root = document.documentElement;
  root.classList.add('js');

  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, value);
    } catch (e) { return null; }
  }

  /* Theme */
  var saved = store('fb-theme');
  if (saved === 'light' || saved === 'dark') root.setAttribute('data-theme', saved);
  document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      store('fb-theme', next);
    });
  });

  /* Mobile menu */
  var nav = document.querySelector('.nav');
  var menuBtn = document.querySelector('.menu-btn');
  if (nav && menuBtn) {
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('.mobile-menu a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Active nav link */
  var page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function (a) {
    if (a.getAttribute('href') === page) a.setAttribute('aria-current', 'page');
  });

  /* Footer year */
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* Scroll reveal */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /* Inline waitlist (email only) */
  document.querySelectorAll('form[data-quick-waitlist]').forEach(function (form) {
    var input = form.querySelector('input[type="email"]');
    var msg = form.querySelector('.form-msg');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!EMAIL.test(input.value.trim())) {
        msg.textContent = 'Enter an email address like name@example.com.';
        input.focus();
        return;
      }
      // Placeholder until a sign-up service is connected.
      msg.textContent = "Thanks! You're on the list. (Preview: sign-ups aren't saved yet.)";
      form.reset();
    });
  });

  /* Full waitlist form */
  var full = document.getElementById('waitlist-full');
  if (full) {
    var status = document.getElementById('waitlist-status');
    full.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = full.querySelector('#wl-email');
      email.setAttribute('aria-invalid', 'false');
      status.className = 'form-status';
      if (!EMAIL.test(email.value.trim())) {
        email.setAttribute('aria-invalid', 'true');
        status.textContent = 'Enter an email address like name@example.com.';
        status.classList.add('err');
        email.focus();
        return;
      }
      // Placeholder until a sign-up service is connected.
      var name = full.querySelector('#wl-name').value.trim();
      var done = document.getElementById('waitlist-done');
      done.querySelector('[data-name]').textContent = name ? ', ' + name.split(' ')[0] : '';
      full.hidden = true;
      done.hidden = false;
      done.querySelector('h2').focus();
    });
  }

  /* FAQ search + category filter */
  var faqSearch = document.getElementById('faq-search');
  if (faqSearch) {
    var chips = document.querySelectorAll('.chips button');
    var groups = document.querySelectorAll('.faq-group');
    var empty = document.getElementById('faq-empty');
    var cat = 'all';
    var norm = function (s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, ''); };
    var filter = function () {
      var q = norm(faqSearch.value);
      var shown = 0;
      groups.forEach(function (g) {
        var inCat = cat === 'all' || g.dataset.cat === cat;
        var any = false;
        g.querySelectorAll('details').forEach(function (d) {
          var hit = inCat && (!q || norm(d.textContent).indexOf(q) !== -1);
          d.hidden = !hit;
          if (hit) { any = true; shown++; if (q) d.open = true; }
        });
        g.hidden = !any;
      });
      empty.hidden = shown !== 0;
    };
    faqSearch.addEventListener('input', filter);
    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        chips.forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
        c.setAttribute('aria-pressed', 'true');
        cat = c.dataset.cat;
        filter();
      });
    });
  }

  /* App demo tabs */
  var tabs = document.querySelectorAll('[data-demo] .tab');
  if (tabs.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var key = tab.dataset.tab;
        tabs.forEach(function (t) { t.setAttribute('aria-selected', String(t === tab)); });
        document.querySelectorAll('[data-panel]').forEach(function (p) { p.hidden = p.dataset.panel !== key; });
        document.querySelectorAll('[data-desc]').forEach(function (p) { p.hidden = p.dataset.desc !== key; });
      });
    });
    var shelfBtns = document.querySelectorAll('[data-shelf-filter] button');
    shelfBtns.forEach(function (b) {
      b.addEventListener('click', function () {
        shelfBtns.forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
        document.querySelectorAll('[data-shelf]').forEach(function (item) {
          item.hidden = b.dataset.f !== 'all' && item.dataset.shelf !== b.dataset.f;
        });
      });
    });
  }
})();
