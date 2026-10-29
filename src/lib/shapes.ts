// Дневни знаци, буйове, сигнални флагове и звукови сигнали като SVG.
const INK = '#0b1620';
let uid = 0;

/* ---------- Дневни знаци ---------- */
const ball = (x: number, y: number, r = 11) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${INK}"/>`;
const coneUp = (x: number, y: number, w = 11, h = 12) => `<polygon points="${x},${y - h} ${x - w},${y + h} ${x + w},${y + h}" fill="${INK}"/>`;
const coneDown = (x: number, y: number, w = 11, h = 12) => `<polygon points="${x - w},${y - h} ${x + w},${y - h} ${x},${y + h}" fill="${INK}"/>`;
const diamond = (x: number, y: number) => `<polygon points="${x},${y - 22} ${x + 11},${y} ${x},${y + 22} ${x - 11},${y}" fill="${INK}"/>`;
const cylinder = (x: number, y: number) => `<rect x="${x - 11}" y="${y - 22}" width="22" height="44" fill="${INK}"/>`;
const hourglass = (x: number, y: number) =>
  `<polygon points="${x - 11},${y - 22} ${x + 11},${y - 22} ${x},${y}" fill="${INK}"/><polygon points="${x - 11},${y + 22} ${x + 11},${y + 22} ${x},${y}" fill="${INK}"/>`;

function daySvg(inner: string, label: string, mast = true, extra = '') {
  return `<svg viewBox="0 0 200 150" role="img" aria-label="${label.replace(/"/g, '&quot;')}" xmlns="http://www.w3.org/2000/svg">` +
    `<rect width="200" height="150" fill="#cfe3ee"/><rect y="128" width="200" height="22" fill="#8fb4c9"/>` +
    (mast ? `<line x1="100" y1="6" x2="100" y2="128" stroke="#3a4f5f" stroke-width="2.5"/>` : '') +
    extra + inner + `</svg>`;
}

export interface DayScene { id: string; title: string; note: string; svg: () => string; }

export const dayScenes: DayScene[] = [
  { id: 'd-ball1', title: 'Кораб на котва', note: 'Една черна сфера на носа.', svg: () => daySvg(ball(100, 66), 'Една сфера') },
  { id: 'd-3balls', title: 'Заседнал кораб', note: 'Три черни сфери във вертикална линия.', svg: () => daySvg(ball(100, 30) + ball(100, 66) + ball(100, 102), 'Три сфери') },
  { id: 'd-2balls', title: 'Кораб без управление', note: 'Две черни сфери във вертикална линия.', svg: () => daySvg(ball(100, 48) + ball(100, 88), 'Две сфери') },
  { id: 'd-ram', title: 'Ограничен в способността да маневрира', note: 'Сфера, ромб, сфера. Така и при водолазна, драгажна и влекачна работа.', svg: () => daySvg(ball(100, 22) + diamond(100, 66) + ball(100, 110), 'Сфера, ромб, сфера') },
  { id: 'd-ram-anchor', title: 'Ограничен в маневрата, на котва', note: 'Сфера-ромб-сфера и още една сфера на носа (знакът за котва).', svg: () => daySvg(ball(46, 66) + ball(130, 22) + diamond(130, 66) + ball(130, 110), 'Сфера на носа и сфера, ромб, сфера', false, `<line x1="130" y1="6" x2="130" y2="128" stroke="#3a4f5f" stroke-width="2.5"/><line x1="46" y1="40" x2="46" y2="128" stroke="#3a4f5f" stroke-width="2.5"/>`) },
  { id: 'd-cyl', title: 'Ограничен от газенето си', note: 'Цилиндър.', svg: () => daySvg(cylinder(100, 66), 'Цилиндър') },
  { id: 'd-cone-down', title: 'Ветроходен кораб с работещ двигател', note: 'Конус с върха надолу, откъм носа.', svg: () => daySvg(coneDown(100, 66, 16, 18), 'Конус с върха надолу') },
  { id: 'd-hourglass', title: 'Кораб, зает с риболов', note: 'Два конуса с върховете един към друг. Мрежи над 150 м: още един конус с върха нагоре към мрежите.', svg: () => daySvg(hourglass(100, 66), 'Два конуса с върхове един към друг') },
  { id: 'd-diamond', title: 'Влачещ (или влачен) кораб, влекало над 200 м', note: 'Ромб: два конуса основа до основа.', svg: () => daySvg(diamond(100, 66), 'Ромб') },
  { id: 'd-mines', title: 'Миночистачен кораб', note: 'Три сфери: една на мачтата, две в краищата на реята.', svg: () => daySvg(ball(100, 24) + ball(56, 70) + ball(144, 70), 'Три сфери', true, `<line x1="44" y1="70" x2="156" y2="70" stroke="#3a4f5f" stroke-width="2.5"/>`) },
  { id: 'd-dredge', title: 'Драгиране или подводна работа', note: 'Сфера-ромб-сфера. Две сфери откъм пречката, два ромба откъм свободния борд.', svg: () => daySvg(ball(100, 22) + diamond(100, 66) + ball(100, 110) + ball(46, 44) + ball(46, 78) + diamond(154, 38) + diamond(154, 90), 'Драгиране') },
  { id: 'd-flagA', title: 'Водолазна дейност', note: 'Флаг A на кода, твърд, най-малко 1 м висок.', svg: () => daySvg(flagSvgInner('A', 62, 40, 76, 52), 'Флаг A', true) },
];

/* ---------- Топмарки на кардиналните знаци ---------- */
const tmCone = (x: number, y: number, up: boolean) =>
  up ? `<polygon points="${x},${y - 14} ${x - 16},${y + 10} ${x + 16},${y + 10}" fill="${INK}"/>` : `<polygon points="${x - 16},${y - 10} ${x + 16},${y - 10} ${x},${y + 14}" fill="${INK}"/>`;

export const topmarkScenes: DayScene[] = [
  { id: 'tm-n', title: 'Северен кардинален', note: 'Два конуса с върховете нагоре. Върховете сочат към черното.', svg: () => daySvg(tmCone(100, 48, true) + tmCone(100, 86, true), 'Два конуса нагоре') },
  { id: 'tm-e', title: 'Източен кардинален', note: 'Конуси основа до основа (ромб).', svg: () => daySvg(tmCone(100, 48, true) + tmCone(100, 86, false), 'Конуси основа до основа') },
  { id: 'tm-s', title: 'Южен кардинален', note: 'Два конуса с върховете надолу.', svg: () => daySvg(tmCone(100, 48, false) + tmCone(100, 86, false), 'Два конуса надолу') },
  { id: 'tm-w', title: 'Западен кардинален', note: 'Конуси връх до връх (пясъчен часовник).', svg: () => daySvg(tmCone(100, 48, false) + tmCone(100, 86, true), 'Конуси връх до връх') },
];

export function dayById(id: string): string {
  const s = [...dayScenes, ...topmarkScenes].find((x) => x.id === id);
  return s ? s.svg() : '';
}

/* ---------- Буйове ---------- */
const BC: Record<string, string> = { black: '#16202a', yellow: '#f6c914', red: '#d3252b', green: '#1f9d4d', white: '#f4f4ef', blue: '#1b4fb0' };

type Shape = 'pillar' | 'spar' | 'can' | 'cone' | 'sphere';
const SHAPES: Record<Shape, { d: string; top: number; bottom: number }> = {
  pillar: { d: 'M24 120 L66 120 L56 50 L34 50 Z', top: 50, bottom: 120 },
  spar: { d: 'M38 120 L52 120 L52 62 L38 62 Z', top: 62, bottom: 120 },
  can: { d: 'M26 120 L64 120 L64 54 L26 54 Z', top: 54, bottom: 120 },
  cone: { d: 'M45 46 L20 120 L70 120 Z', top: 46, bottom: 120 },
  sphere: { d: 'M45 62 a28 28 0 1 0 0.01 0 Z', top: 62, bottom: 118 },
};

function topmark(kind: string, y: number): string {
  const x = 45;
  const c = (up: boolean, cy: number) => up
    ? `<polygon points="${x},${cy - 8} ${x - 9},${cy + 6} ${x + 9},${cy + 6}" fill="${INK}"/>`
    : `<polygon points="${x - 9},${cy - 6} ${x + 9},${cy - 6} ${x},${cy + 8}" fill="${INK}"/>`;
  switch (kind) {
    case 'cones-up': return c(true, y - 24) + c(true, y - 8);
    case 'cones-down': return c(false, y - 24) + c(false, y - 8);
    case 'cones-bb': return c(true, y - 24) + c(false, y - 8);
    case 'cones-ap': return c(false, y - 24) + c(true, y - 8);
    case 'two-balls': return `<circle cx="${x}" cy="${y - 28}" r="7" fill="${INK}"/><circle cx="${x}" cy="${y - 11}" r="7" fill="${INK}"/>`;
    case 'ball-red': return `<circle cx="${x}" cy="${y - 10}" r="8" fill="${BC.red}"/>`;
    case 'x-yellow': return `<g stroke="${BC.yellow}" stroke-width="5" stroke-linecap="round"><line x1="${x - 8}" y1="${y - 24}" x2="${x + 8}" y2="${y - 8}"/><line x1="${x + 8}" y1="${y - 24}" x2="${x - 8}" y2="${y - 8}"/></g>`;
    case 'can-red': return `<rect x="${x - 7}" y="${y - 22}" width="14" height="16" fill="${BC.red}"/>`;
    case 'can-green': return `<rect x="${x - 7}" y="${y - 22}" width="14" height="16" fill="${BC.green}"/>`;
    case 'cone-red': return `<polygon points="${x},${y - 24} ${x - 9},${y - 6} ${x + 9},${y - 6}" fill="${BC.red}"/>`;
    case 'cone-green': return `<polygon points="${x},${y - 24} ${x - 9},${y - 6} ${x + 9},${y - 6}" fill="${BC.green}"/>`;
    default: return '';
  }
}

export interface BuoySpec {
  id: string; title: string; note: string;
  shape: Shape; bands: string[]; stripes?: [string, string]; top?: string; light?: string;
}

export function buoySvg(b: BuoySpec): string {
  const id = `b${uid++}`;
  const sh = SHAPES[b.shape];
  const h = sh.bottom - sh.top;
  let fill = '';
  if (b.stripes) {
    const [c1, c2] = b.stripes;
    for (let i = 0; i < 8; i++) fill += `<rect x="${18 + i * 7}" y="${sh.top}" width="7" height="${h}" fill="${BC[i % 2 ? c2 : c1]}"/>`;
  } else {
    const n = b.bands.length;
    b.bands.forEach((c, i) => { fill += `<rect x="10" y="${(sh.top + (h / n) * i).toFixed(1)}" width="70" height="${(h / n + 0.6).toFixed(1)}" fill="${BC[c]}"/>`; });
  }
  const tm = b.top ? topmark(b.top, sh.top) : '';
  return `<svg viewBox="0 0 90 150" role="img" aria-label="${b.title.replace(/"/g, '&quot;')}" xmlns="http://www.w3.org/2000/svg">` +
    `<defs><clipPath id="${id}"><path d="${sh.d}"/></clipPath></defs>` +
    `<rect width="90" height="150" fill="#cfe3ee"/><rect y="118" width="90" height="32" fill="#8fb4c9"/>` +
    `<g clip-path="url(#${id})">${fill}</g><path d="${sh.d}" fill="none" stroke="#0b1620" stroke-opacity=".5" stroke-width="1"/>` +
    tm + `<path d="M0 122 q11 -6 22 0 t22 0 t22 0 t22 0" fill="none" stroke="#e8f3f9" stroke-width="2" opacity=".8"/></svg>`;
}

export const cardinals: BuoySpec[] = [
  { id: 'n', title: 'Северен', note: 'Мини на север от мен. Черно горе, жълто долу.', shape: 'pillar', bands: ['black', 'yellow'], top: 'cones-up', light: 'Бяла, Q или VQ (непрекъснато)' },
  { id: 'e', title: 'Източен', note: 'Мини на изток от мен. Черно-жълто-черно.', shape: 'pillar', bands: ['black', 'yellow', 'black'], top: 'cones-bb', light: 'Бяла, Q(3) 10 s или VQ(3) 5 s' },
  { id: 's', title: 'Южен', note: 'Мини на юг от мен. Жълто горе, черно долу.', shape: 'pillar', bands: ['yellow', 'black'], top: 'cones-down', light: 'Бяла, Q(6)+LFl 15 s или VQ(6)+LFl 10 s' },
  { id: 'w', title: 'Западен', note: 'Мини на запад от мен. Жълто-черно-жълто.', shape: 'pillar', bands: ['yellow', 'black', 'yellow'], top: 'cones-ap', light: 'Бяла, Q(9) 15 s или VQ(9) 10 s' },
];

export const others: BuoySpec[] = [
  { id: 'isol', title: 'Отделна опасност', note: 'Опасност с безопасна вода около нея. Черно с една или повече червени ленти.', shape: 'spar', bands: ['black', 'red', 'black'], top: 'two-balls', light: 'Бяла, групово пробляскваща с 2 проблясъка Fl(2)' },
  { id: 'safe', title: 'Безопасни води', note: 'Водите около знака са плавателни. Червени и бели вертикални ленти.', shape: 'sphere', bands: [], stripes: ['red', 'white'], top: 'ball-red', light: 'Бяла: изофазна, затъмняваща, един дълъг проблясък 10 s или Морз „A“' },
  { id: 'special', title: 'Специален знак', note: 'Обект или особеност от пособията за плаване: кабели, тръбопроводи, райони за учения и отдих. Жълт, топмарка е жълт „X“.', shape: 'pillar', bands: ['yellow'], top: 'x-yellow', light: 'Жълта (по избор)' },
  { id: 'newd', title: 'Нова опасност', note: 'Нова, още неотбелязана в картите опасност: вертикални сини и жълти ленти.', shape: 'pillar', bands: [], stripes: ['blue', 'yellow'], light: 'Сини и жълти светлини, редуващи се' },
];

export const lateralA: BuoySpec[] = [
  { id: 'a-port', title: 'Ляв (Район A)', note: 'Червен, цилиндър. Лява страна на основния път.', shape: 'can', bands: ['red'], top: 'can-red', light: 'Червена' },
  { id: 'a-stbd', title: 'Десен (Район A)', note: 'Зелен, конус. Дясна страна на основния път.', shape: 'cone', bands: ['green'], top: 'cone-green', light: 'Зелена' },
  { id: 'a-pref-stbd', title: 'Основният път е надясно (A)', note: 'Червено-зелено-червено, цилиндър.', shape: 'can', bands: ['red', 'green', 'red'], top: 'can-red', light: 'Червена, групово Fl(2+1)' },
  { id: 'a-pref-port', title: 'Основният път е наляво (A)', note: 'Зелено-червено-зелено, конус.', shape: 'cone', bands: ['green', 'red', 'green'], top: 'cone-green', light: 'Зелена, групово Fl(2+1)' },
];
export const lateralB: BuoySpec[] = [
  { id: 'b-port', title: 'Ляв (Район B)', note: 'Зелен, цилиндър. Лява страна на основния път.', shape: 'can', bands: ['green'], top: 'can-green', light: 'Зелена' },
  { id: 'b-stbd', title: 'Десен (Район B)', note: 'Червен, конус. Дясна страна на основния път.', shape: 'cone', bands: ['red'], top: 'cone-red', light: 'Червена' },
  { id: 'b-pref-stbd', title: 'Основният път е надясно (B)', note: 'Зелено-червено-зелено, цилиндър.', shape: 'can', bands: ['green', 'red', 'green'], top: 'can-green', light: 'Зелена, групово Fl(2+1)' },
  { id: 'b-pref-port', title: 'Основният път е наляво (B)', note: 'Червено-зелено-червено, конус.', shape: 'cone', bands: ['red', 'green', 'red'], top: 'cone-red', light: 'Червена, групово Fl(2+1)' },
];

/* ---------- Сигнални флагове ---------- */
const FB = '#0b3d91', FR = '#d62828', FY = '#ffd12a', FW = '#ffffff';
const swallow = (w: number, h: number) => `M0 0 L${w} 0 L${w * 0.75} ${h / 2} L${w} ${h} L0 ${h} Z`;

export function flagSvgInner(code: string, x: number, y: number, w: number, h: number): string {
  const sx = w / 60, sy = h / 40;
  const g = (body: string) => `<g transform="translate(${x} ${y}) scale(${sx} ${sy})">${body}</g>`;
  switch (code) {
    case 'A': return g(`<rect width="30" height="40" fill="${FW}"/><path d="M30 0 L60 0 L45 20 L60 40 L30 40 Z" fill="${FB}"/>`);
    case 'B': return g(`<path d="${swallow(60, 40)}" fill="${FR}"/>`);
    case 'C': return g([FB, FW, FR, FW, FB].map((c, i) => `<rect y="${i * 8}" width="60" height="8" fill="${c}"/>`).join(''));
    case 'G': return g(Array.from({ length: 6 }, (_, i) => `<rect x="${i * 10}" width="10" height="40" fill="${i % 2 ? FB : FY}"/>`).join(''));
    case 'H': return g(`<rect width="30" height="40" fill="${FW}"/><rect x="30" width="30" height="40" fill="${FR}"/>`);
    case 'M': return g(`<clipPath id="cpM"><rect width="60" height="40"/></clipPath><rect width="60" height="40" fill="${FB}"/><path clip-path="url(#cpM)" d="M0 0 L60 40 M60 0 L0 40" stroke="${FW}" stroke-width="7"/>`);
    case 'N': {
      let s = '';
      for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) s += `<rect x="${c * 15}" y="${r * 10}" width="15" height="10" fill="${(r + c) % 2 ? FW : FB}"/>`;
      return g(s);
    }
    case 'O': return g(`<polygon points="0,0 60,0 60,40" fill="${FR}"/><polygon points="0,0 60,40 0,40" fill="${FY}"/>`);
    case 'Q': return g(`<rect width="60" height="40" fill="${FY}"/>`);
    case 'T': return g(`<rect width="20" height="40" fill="${FR}"/><rect x="20" width="20" height="40" fill="${FW}"/><rect x="40" width="20" height="40" fill="${FB}"/>`);
    case 'U': return g(`<rect width="30" height="20" fill="${FR}"/><rect x="30" width="30" height="20" fill="${FW}"/><rect y="20" width="30" height="20" fill="${FW}"/><rect x="30" y="20" width="30" height="20" fill="${FR}"/>`);
    case 'V': return g(`<clipPath id="cpV"><rect width="60" height="40"/></clipPath><rect width="60" height="40" fill="${FW}"/><path clip-path="url(#cpV)" d="M0 0 L60 40 M60 0 L0 40" stroke="${FR}" stroke-width="7"/>`);
    default: return '';
  }
}

export function flagSvg(code: string): string {
  if (code === 'NC') {
    return `<svg viewBox="0 0 70 100" role="img" aria-label="Флагове N над C" xmlns="http://www.w3.org/2000/svg"><rect width="70" height="100" fill="#cfe3ee"/>${flagSvgInner('N', 5, 6, 60, 40)}${flagSvgInner('C', 5, 54, 60, 40)}</svg>`;
  }
  return `<svg viewBox="0 0 70 56" role="img" aria-label="Флаг ${code}" xmlns="http://www.w3.org/2000/svg"><rect width="70" height="56" fill="#cfe3ee"/>${flagSvgInner(code, 5, 8, 60, 40)}</svg>`;
}

export const flags: { code: string; name: string; meaning: string }[] = [
  { code: 'A', name: 'A (Алфа)', meaning: 'Водолаз във водата. Дръжте се на разстояние и с малък ход.' },
  { code: 'B', name: 'B (Браво)', meaning: 'Товаря, разтоварвам или превозвам опасен товар.' },
  { code: 'C', name: 'C (Чарли)', meaning: 'Да, утвърдително.' },
  { code: 'G', name: 'G (Голф)', meaning: 'Искам пилот.' },
  { code: 'H', name: 'H (Хотел)', meaning: 'Имам пилот на борда.' },
  { code: 'M', name: 'M (Майк)', meaning: 'На борда си имам лекар.' },
  { code: 'N', name: 'N (Новембер)', meaning: 'Не, отрицание.' },
  { code: 'O', name: 'O (Оскар)', meaning: 'Човек зад борда.' },
  { code: 'Q', name: 'Q (Кебек)', meaning: 'Моят кораб не е заразен, искам свободна практика.' },
  { code: 'T', name: 'T (Танго)', meaning: 'По ключа на изпита: не пресичайте курса ми, не минавайте по носа ми.' },
  { code: 'U', name: 'U (Юниформ)', meaning: 'Вие отивате към опасност.' },
  { code: 'V', name: 'V (Виктор)', meaning: 'Нужна ми е помощ.' },
  { code: 'NC', name: 'N над C', meaning: 'Търпя бедствие и се нуждая от помощ.' },
];

/* ---------- Звукови сигнали: '-' продължителен, '.' къс ---------- */
export function seqSvg(seq: string): string {
  const parts = seq.trim().split(/\s+/);
  let x = 2; let out = '';
  for (const p of parts) {
    for (const ch of p) {
      if (ch === '-') { out += `<rect x="${x}" y="4" width="30" height="9" rx="2" fill="currentColor"/>`; x += 34; }
      else if (ch === '.') { out += `<rect x="${x}" y="4" width="9" height="9" rx="2" fill="currentColor"/>`; x += 13; }
    }
    x += 8;
  }
  return `<svg class="seq" width="${x}" height="17" viewBox="0 0 ${x} 17" role="img" aria-label="${seq.replace(/-/g, 'продължителен ').replace(/\./g, 'къс ')}" xmlns="http://www.w3.org/2000/svg">${out}</svg>`;
}
