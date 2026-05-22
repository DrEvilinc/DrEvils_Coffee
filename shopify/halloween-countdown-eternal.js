/**
 * Eternal Halloween countdown for shop.drevil.coffee (Impact theme).
 * Counts down to Oct 31 each year; on Halloween day shows THE BEAST HAS AWAKENED.
 *
 * Install: Shopify Admin → Online Store → Themes → Edit code → Assets → Add file
 * Then in theme.liquid before </body>:
 *   <script src="{{ 'halloween-countdown-eternal.js' | asset_url }}" defer></script>
 */
(function () {
  const BEAST_MESSAGE = 'THE BEAST HAS AWAKENED';
  const OCTOBER = 9;

  function isHalloweenDay(date) {
    return date.getMonth() === OCTOBER && date.getDate() === 31;
  }

  function getNextHalloweenMidnight(from) {
    const year = from.getFullYear();
    let target = new Date(year, OCTOBER, 31, 0, 0, 0, 0);
    if (from.getTime() >= target.getTime()) {
      target = new Date(year + 1, OCTOBER, 31, 0, 0, 0, 0);
    }
    return target;
  }

  function getCountdownParts(target, now) {
    let remaining = Math.max(0, target.getTime() - now.getTime());
    const days = Math.floor(remaining / 86400000);
    remaining -= days * 86400000;
    const hours = Math.floor(remaining / 3600000);
    remaining -= hours * 3600000;
    const minutes = Math.floor(remaining / 60000);
    remaining -= minutes * 60000;
    const seconds = Math.floor(remaining / 1000);
    return { days, hours, minutes, seconds };
  }

  function findTimer() {
    return document.querySelector('countdown-timer');
  }

  function findFlips(timer) {
    return {
      days: timer.querySelector('countdown-timer-flip[type="days"]'),
      hours: timer.querySelector('countdown-timer-flip[type="hours"]'),
      minutes: timer.querySelector('countdown-timer-flip[type="minutes"]'),
      seconds: timer.querySelector('countdown-timer-flip[type="seconds"]'),
    };
  }

  function updateFlip(flip, value) {
    if (!flip) return;
    if (typeof flip.updateValue === 'function') {
      flip.updateValue(value);
      return;
    }
    const digits = flip.querySelectorAll('countdown-timer-flip-digit');
    const text = String(value).padStart(2, '0');
    digits.forEach((digit, i) => {
      if (digit.textContent !== undefined) {
        digit.textContent = text[i] ?? '0';
      }
    });
  }

  function showBeastMessage(timer) {
    let el = timer.querySelector('[data-halloween-beast-message]');
    if (!el) {
      el = document.createElement('div');
      el.setAttribute('data-halloween-beast-message', 'true');
      el.className = 'halloween-beast-awakened';
      el.style.cssText =
        'color:#fff;font-family:ui-monospace,monospace;font-size:11px;letter-spacing:0.12em;white-space:nowrap;';
      el.textContent = BEAST_MESSAGE;
      timer.appendChild(el);
    }
    el.hidden = false;
    timer.querySelectorAll('countdown-timer-flip').forEach((flip) => {
      flip.style.display = 'none';
    });
    timer.querySelectorAll('.countdown-timer__separator, [class*="separator"]').forEach((sep) => {
      sep.style.display = 'none';
    });
  }

  function showCountdown(timer) {
    const beast = timer.querySelector('[data-halloween-beast-message]');
    if (beast) beast.hidden = true;
    timer.querySelectorAll('countdown-timer-flip').forEach((flip) => {
      flip.style.display = '';
    });
    timer.querySelectorAll('.countdown-timer__separator, [class*="separator"]').forEach((sep) => {
      sep.style.display = '';
    });
  }

  function tick(timer) {
    const now = new Date();
    if (isHalloweenDay(now)) {
      showBeastMessage(timer);
      return;
    }
    showCountdown(timer);
    const target = getNextHalloweenMidnight(now);
    const parts = getCountdownParts(target, now);
    const flips = findFlips(timer);
    updateFlip(flips.days, parts.days);
    updateFlip(flips.hours, parts.hours);
    updateFlip(flips.minutes, parts.minutes);
    updateFlip(flips.seconds, parts.seconds);
  }

  function init() {
    const timer = findTimer();
    if (!timer) return;

    timer.removeAttribute('expires-at');
    if (timer._halloweenEternalInterval) {
      clearInterval(timer._halloweenEternalInterval);
    }
    tick(timer);
    timer._halloweenEternalInterval = setInterval(() => tick(timer), 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('shopify:section:load', init);
})();
