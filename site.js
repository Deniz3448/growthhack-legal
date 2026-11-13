// Belge sayfaları: okunan bölümü içindekilerde işaretler + başlıklar girişte yükselir. Betik yoksa içerik olduğu gibi görünür.
document.documentElement.classList.add('js');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

const rv = [...document.querySelectorAll('.dochead > *, .prose > *, .prose li, .toc b, .toc a')];
rv.forEach((el, i) => { el.classList.add('rv'); const p = el.parentElement; if (p.classList.contains('dochead') || p.classList.contains('toc') || p.tagName === 'UL') el.style.setProperty('--d', ([...p.children].indexOf(el) % 8) * 60 + 'ms'); });
if (reduce || !('IntersectionObserver' in window)) rv.forEach(el => el.classList.add('in'));
else {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  rv.forEach(el => io.observe(el));
}

document.querySelectorAll('.doc').forEach(doc => {
  const links = new Map([...doc.querySelectorAll('.toc a')].map(a => [a.getAttribute('href').slice(1), a]));
  const heads = [...doc.querySelectorAll('.prose h2[id]')];
  if (!heads.length) return;
  const mark = () => {
    let cur = heads[0];
    for (const h of heads) if (h.getBoundingClientRect().top < 140) cur = h;
    links.forEach(a => a.classList.remove('on'));
    links.get(cur.id)?.classList.add('on');
  };
  addEventListener('scroll', mark, { passive: true });
  mark();
});
