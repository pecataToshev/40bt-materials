import { flagSvg } from './shapes';

// Картинки за сигнали за бедствие (МППСМ, Приложение IV). Нарисувани са схематично.
const W = 200, H = 140;
const svg = (inner: string, label: string, bg = '#0b1f30') =>
  `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="${bg}"/>${inner}</svg>`;
const sea = `<rect y="108" width="200" height="32" fill="#12344d"/><path d="M0 112 q12 -6 25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0 t25 0" fill="none" stroke="#3b6e8f" stroke-width="2"/>`;
const boat = (x = 100) => `<path d="M${x - 36} 98 h72 l-10 16 h-52 Z" fill="#c9d6de"/><rect x="${x - 6}" y="78" width="12" height="20" fill="#9fb2bf"/>`;

const dot = (x: number, y: number, c = '#fdfdf2') => `<circle cx="${x}" cy="${y}" r="7" fill="${c}"/>`;
const dash = (x: number, y: number, c = '#fdfdf2') => `<rect x="${x}" y="${y - 7}" width="26" height="14" rx="4" fill="${c}"/>`;

const star = (cx: number, cy: number, r: number, c: string) => {
  const p = Array.from({ length: 8 }, (_, i) => { const a = (i * Math.PI) / 4; const rr = i % 2 ? r * 0.4 : r; return `${(cx + rr * Math.sin(a)).toFixed(1)},${(cy - rr * Math.cos(a)).toFixed(1)}`; }).join(' ');
  return `<polygon points="${p}" fill="${c}"/><circle cx="${cx}" cy="${cy}" r="${r * 1.6}" fill="${c}" opacity=".25"/>`;
};

export interface Distress { id: string; title: string; note: string; svg: () => string; }

export const distress: Distress[] = [
  { id: 'sos', title: 'SOS', note: 'Морзов код: три къси, три дълги, три къси. Със светлина или звук. По радио се подава „MAYDAY“.',
    svg: () => {
      const L = (y: number, ch: string, k: 'd' | 'l') => {
        let o = `<text x="30" y="${y + 6}" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-weight="700" font-size="18" fill="#9fd0e8">${ch}</text>`;
        for (let i = 0; i < 3; i++) o += k === 'd' ? `<circle cx="${70 + i * 30}" cy="${y}" r="7" fill="#fdfdf2"/>` : `<rect x="${58 + i * 44}" y="${y - 7}" width="34" height="14" rx="4" fill="#fdfdf2"/>`;
        return o;
      };
      return svg(L(32, 'S', 'd') + L(70, 'O', 'l') + L(108, 'S', 'd'), 'SOS в Морзов код');
    } },
  { id: 'mayday', title: 'MAYDAY по радио', note: 'Три пъти „MAYDAY“ на УКВ канал 16, след него името на кораба, позицията и какво се случва.',
    svg: () => svg(
      `<rect x="78" y="34" width="44" height="64" rx="10" fill="#c9d6de"/><rect x="88" y="44" width="24" height="20" rx="3" fill="#0b1f30"/><circle cx="100" cy="80" r="7" fill="#e0414a"/><line x1="100" y1="34" x2="100" y2="14" stroke="#c9d6de" stroke-width="4"/>` +
      `<text x="100" y="124" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-weight="700" font-size="15" fill="#ff8a8a">MAYDAY ×3 · канал 16</text>`,
      'Радиостанция: MAYDAY')
  },
  { id: 'rockets', title: 'Червени ракети', note: 'Ракети или гранати, които хвърлят червени звезди една по една на кратки интервали.',
    svg: () => svg(sea + boat(60) + `<line x1="140" y1="100" x2="140" y2="58" stroke="#8a97a0" stroke-width="2" stroke-dasharray="3 3"/>` + star(140, 40, 14, '#ff3d3d') + star(172, 26, 9, '#ff3d3d') + star(110, 26, 9, '#ff3d3d'), 'Червени ракети')
  },
  { id: 'parachute', title: 'Червена ракета с парашут', note: 'Червена светлина, която бавно пада на парашут. Вижда се най-далеч.',
    svg: () => svg(sea + boat(100) + `<path d="M70 38 q30 -34 60 0 Z" fill="#e8e8e8"/><line x1="70" y1="38" x2="100" y2="68" stroke="#e8e8e8"/><line x1="130" y1="38" x2="100" y2="68" stroke="#e8e8e8"/>` + star(100, 74, 8, '#ff3d3d'), 'Парашутна ракета')
  },
  { id: 'handflare', title: 'Червен ръчен факел', note: 'Държи се високо и далеч от тялото. Гори около минута.',
    svg: () => svg(sea + boat(70) + `<rect x="131" y="72" width="6" height="36" rx="2" fill="#c9d6de" transform="rotate(14 134 90)"/>` + star(146, 62, 13, '#ff3d3d'), 'Ръчен факел')
  },
  { id: 'smoke', title: 'Оранжев дим', note: 'Дим на плаваща димка. Служи през деня, при по-малко вятър.',
    svg: () => svg(sea + boat(100) + `<circle cx="116" cy="66" r="9" fill="#ff9a33"/><circle cx="128" cy="50" r="13" fill="#ff9a33" opacity=".85"/><circle cx="146" cy="34" r="17" fill="#ff9a33" opacity=".7"/><circle cx="170" cy="22" r="20" fill="#ff9a33" opacity=".5"/>`, 'Оранжев дим', '#7fb6d4')
  },
  { id: 'arms', title: 'Движение на ръцете', note: 'Разперени ръце, бавно и многократно вдигани и спускани настрани.',
    svg: () => svg(`<circle cx="100" cy="36" r="12" fill="#f0c9a4"/><line x1="100" y1="48" x2="100" y2="92" stroke="#f0c9a4" stroke-width="7" stroke-linecap="round"/><line x1="100" y1="92" x2="88" y2="124" stroke="#f0c9a4" stroke-width="7" stroke-linecap="round"/><line x1="100" y1="92" x2="112" y2="124" stroke="#f0c9a4" stroke-width="7" stroke-linecap="round"/><line x1="100" y1="58" x2="52" y2="42" stroke="#f0c9a4" stroke-width="7" stroke-linecap="round"/><line x1="100" y1="58" x2="148" y2="42" stroke="#f0c9a4" stroke-width="7" stroke-linecap="round"/><line x1="100" y1="58" x2="52" y2="86" stroke="#f0c9a4" stroke-width="3" stroke-dasharray="4 4"/><line x1="100" y1="58" x2="148" y2="86" stroke="#f0c9a4" stroke-width="3" stroke-dasharray="4 4"/><text x="40" y="106" font-size="22" fill="#9fd0e8">↕</text><text x="150" y="106" font-size="22" fill="#9fd0e8">↕</text>`, 'Човек, който вдига и спуска ръце', '#12344d')
  },
  { id: 'nc', title: 'Флагове N над C', note: 'Международният код: „Търпя бедствие и се нуждая от помощ“.',
    svg: () => `<div class="flag-wrap">${flagSvg('NC')}</div>`
  },
  { id: 'ballflag', title: 'Квадратен флаг и сфера', note: 'Квадратен флаг с кълбовидна фигура (сфера) над или под него.',
    svg: () => svg(`<line x1="100" y1="10" x2="100" y2="130" stroke="#c9d6de" stroke-width="3"/><rect x="100" y="36" width="52" height="40" fill="#f6f6f0"/><circle cx="126" cy="20" r="9" fill="#0b1620" stroke="#c9d6de"/><circle cx="126" cy="104" r="9" fill="#0b1620" stroke="#c9d6de"/><text x="100" y="138" font-size="9" fill="#9fb2bf" text-anchor="middle"> </text>`, 'Квадратен флаг и сфера', '#12344d')
  },
  { id: 'horn', title: 'Непрекъснат звук', note: 'Продължително звучене на сирена или други сигнали за мъгла, без прекъсване.',
    svg: () => svg(`<path d="M52 58 h26 l34 -22 v68 l-34 -22 h-26 Z" fill="#c9d6de"/><path d="M128 58 q14 12 0 24" fill="none" stroke="#9fd0e8" stroke-width="4" stroke-linecap="round"/><path d="M142 46 q26 24 0 48" fill="none" stroke="#9fd0e8" stroke-width="4" stroke-linecap="round"/><path d="M156 34 q38 36 0 72" fill="none" stroke="#9fd0e8" stroke-width="4" stroke-linecap="round" opacity=".6"/>`, 'Непрекъснат звуков сигнал')
  },
  { id: 'gun', title: 'Изстрел през около минута', note: 'Пушечен или друг взривен сигнал, повтарян през около 1 минута.',
    svg: () => svg(sea + boat(70) + star(142, 56, 16, '#ffd028') + `<text x="100" y="132" text-anchor="middle" font-family="IBM Plex Sans, sans-serif" font-size="12" fill="#c9d6de">на всяка минута</text>`, 'Взривен сигнал')
  },
  { id: 'fire', title: 'Пламъци на кораба', note: 'Гори например варел с катран или петрол.',
    svg: () => svg(sea + boat(100) + `<rect x="90" y="80" width="20" height="16" fill="#555"/><path d="M92 80 q-10 -22 8 -36 q4 18 16 14 q6 10 -6 22 Z" fill="#ff7b24"/><path d="M96 80 q-4 -14 6 -22 q4 10 8 8 q2 8 -4 14 Z" fill="#ffd028"/>`, 'Пламъци на кораб')
  },
  { id: 'epirb', title: 'Радиобуй (EPIRB)', note: 'Аварийният радиобуй изпраща автоматично позицията на кораба на спасителите.',
    svg: () => svg(sea + `<rect x="86" y="46" width="28" height="50" rx="8" fill="#ff7a1a"/><rect x="95" y="28" width="10" height="22" fill="#ff7a1a"/><circle cx="100" cy="64" r="6" fill="#fff"/><path d="M70 30 q30 -26 60 0 M60 18 q40 -36 80 0" fill="none" stroke="#9fd0e8" stroke-width="3" stroke-linecap="round"/>`, 'Аварийен радиобуй')
  },
];
