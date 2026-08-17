'use client';

import { Fragment, useEffect, useState } from 'react';

const STORE_KEY = 'uk-trip-2026-done';

const DAYS = [
  {
    key: 'd1', day: 1, date: '23', month: '8 月', week: '周日',
    city: '曼彻斯特', color: 'var(--c-man)', chipBg: 'var(--c-man-bg)',
    badges: [
      { icon: 'i-send', cls: 'b-arrive', text: '06:45 抵达' },
      { icon: 'i-train', cls: 'b-train', text: '火车' },
    ],
    desc: '06:45 抵达曼彻斯特，入关后乘火车进市区，寄存行李后游览曼彻斯特',
    transit: [
      { name: 'Manchester Airport', sub: '09:05 发车' },
      { name: 'Manchester Piccadilly', sub: '09:22 到达' },
    ],
    meta: ['🚶 步行 6 分钟至酒店'],
    map: { href: 'https://maps.app.goo.gl/WdBgAnyBcbZDhRTCA', label: '机场 → 酒店 地图' },
    stay: '曼城中心智选假日酒店',
  },
  {
    key: 'd2', day: 2, date: '24', month: '8 月', week: '周一',
    city: '曼彻斯特', color: 'var(--c-man)', chipBg: 'var(--c-man-bg)',
    badges: [{ icon: 'i-train', cls: 'b-train', text: '火车往返' }],
    desc: '约克一日游：早上出发，傍晚返回曼彻斯特',
    transit: [
      { name: 'Manchester Piccadilly', sub: '09:00 发车' },
      { name: 'York', sub: '约克一日游' },
      { name: 'Manchester Piccadilly', sub: '18:58 返回' },
    ],
    meta: ['单程车程约 1 小时 20 分'],
    stay: '曼城中心智选假日酒店',
  },
  {
    key: 'd3', day: 3, date: '25', month: '8 月', week: '周二',
    city: '利物浦', color: 'var(--c-liv)', chipBg: 'var(--c-liv-bg)',
    badges: [{ icon: 'i-train', cls: 'b-train', text: '火车' }],
    transit: [
      { name: 'Manchester Piccadilly', sub: '12:54 发车' },
      { name: 'Liverpool Lime Street', sub: '13:53 到达' },
    ],
    meta: ['车程约 1 小时', '🚶 步行 13 分钟至酒店'],
    map: { href: 'https://maps.app.goo.gl/htb5GtF8bnchTuDeA', label: '酒店 → 酒店 地图' },
    stay: 'The Halyard Liverpool',
  },
  {
    key: 'd4', day: 4, date: '26', month: '8 月', week: '周三',
    city: '利物浦', color: 'var(--c-liv)', chipBg: 'var(--c-liv-bg)',
    desc: '全天游览利物浦',
    stay: 'The Halyard Liverpool',
  },
  {
    key: 'd5', day: 5, date: '27', month: '8 月', week: '周四',
    city: '牛津', color: 'var(--c-oxf)', chipBg: 'var(--c-oxf-bg)',
    badges: [{ icon: 'i-train', cls: 'b-train', text: '火车' }],
    desc: '抵达后游览牛津',
    descAfterTransit: true,
    transit: [
      { name: 'Liverpool Lime Street', sub: '11:33 发车' },
      { name: 'Oxford', sub: '14:36 到达' },
    ],
    meta: ['车程约 3 小时'],
    stay: 'voco Oxford Spires',
    staySuffix: '（1 晚）',
  },
  {
    key: 'd6', day: 6, date: '28', month: '8 月', week: '周五',
    city: '伦敦', color: 'var(--c-ldn)', chipBg: 'var(--c-ldn-bg)',
    badges: [{ icon: 'i-train', cls: 'b-train', text: '火车' }],
    desc: '乘火车前往伦敦',
    descAfterTransit: true,
    transit: [
      { name: 'Oxford', sub: '15:01 发车' },
      { name: 'London West Brompton', sub: '15:52 到达' },
    ],
    meta: ['车程约 1 小时'],
    stay: 'The Rockwell',
  },
  {
    key: 'd7', day: 7, date: '29', month: '8 月', week: '周六',
    city: '伦敦', color: 'var(--c-ldn)', chipBg: 'var(--c-ldn-bg)',
    desc: '全天游览伦敦',
    stay: 'The Rockwell',
  },
  {
    key: 'd8', day: 8, date: '30', month: '8 月', week: '周日',
    city: '伦敦', color: 'var(--c-ldn)', chipBg: 'var(--c-ldn-bg)',
    desc: '全天游览伦敦',
    stay: 'The Rockwell',
  },
  {
    key: 'd9', day: 9, date: '31', month: '8 月', week: '周一',
    city: '伦敦', color: 'var(--c-ldn)', chipBg: 'var(--c-ldn-bg)',
    desc: '全天游览伦敦',
    stay: 'The Rockwell',
  },
  {
    key: 'd10', day: 10, date: '01', month: '9 月', week: '周二',
    city: '伦敦 → 回国', color: 'var(--c-man)', chipBg: 'var(--c-man-bg)',
    badges: [{ icon: 'i-send', cls: 'b-fly', text: '希思罗 T2 · 20:25', bold: '20:25' }],
    desc: '伦敦最后一天，随后前往希思罗机场',
    transit: [
      { name: '伦敦', sub: '最后一天' },
      { name: '希思罗机场', sub: 'T2 航站楼' },
    ],
    flyTime: '20:25 ✈ 回中国',
    stay: '夜宿云端 · 睡一觉就到家了',
    stayPlain: true,
    stayIcon: 'i-moon',
  },
];

const LODGING = [
  { city: '曼彻斯特', color: 'var(--c-man)', range: '8.23 — 8.25 · 曼城中心智选假日酒店', nights: 2 },
  { city: '利物浦', color: 'var(--c-liv)', range: '8.25 — 8.27 · The Halyard Liverpool', nights: 2 },
  { city: '牛津', color: 'var(--c-oxf)', range: '8.27 — 8.28 · voco Oxford Spires', nights: 1 },
  { city: '伦敦', color: 'var(--c-ldn)', range: '8.28 — 9.01 · The Rockwell', nights: 4 },
];

const TRANSPORT = [
  { date: '8.23 周日', from: 'Manchester Airport', to: 'Manchester Piccadilly', time: '09:05 – 09:22', note: '入关后乘车；到站步行 6 分钟至酒店寄存行李' },
  { date: '8.24 周一', from: 'Manchester Piccadilly', to: 'York', time: '09:00 去 / 18:58 返', note: '约克一日往返；单程车程约 1 小时 20 分' },
  { date: '8.25 周二', from: 'Manchester Piccadilly', to: 'Liverpool Lime Street', time: '12:54 – 13:53', note: '车程约 1 小时；到站步行 13 分钟至酒店' },
  { date: '8.27 周四', from: 'Liverpool Lime Street', to: 'Oxford', time: '11:33 – 14:36', note: '车程约 3 小时；抵达后游览牛津' },
  { date: '8.28 周五', from: 'Oxford', to: 'London West Brompton', time: '15:01 – 15:52', note: '车程约 1 小时' },
  { date: '9.01 周二', from: '伦敦市区', to: '希思罗机场 T2', time: '20:25 起飞 ✈', note: '从酒店出发前往机场，当晚飞回中国' },
];

function Icons() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
      <symbol id="i-send" viewBox="0 0 24 24"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></symbol>
      <symbol id="i-home" viewBox="0 0 24 24"><path d="M3 9.5 12 2l9 7.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z M9 22V12h6v10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></symbol>
      <symbol id="i-train" viewBox="0 0 24 24"><rect x="5" y="2.5" width="14" height="14" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M5 10.5h14M9.5 5.5h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" /><path d="M8.5 21.5 11 16.5M15.5 21.5 13 16.5M5 21.5h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" /></symbol>
      <symbol id="i-check" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></symbol>
      <symbol id="i-arr" viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></symbol>
      <symbol id="i-moon" viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></symbol>
    </svg>
  );
}

export default function Home() {
  const [done, setDone] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    try {
      setDone(JSON.parse(localStorage.getItem(STORE_KEY) || '{}'));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(done));
    } catch {}
  }, [done, loaded]);

  useEffect(() => {
    const start = new Date(2026, 7, 23);
    const end = new Date(2026, 8, 1);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const DAY = 86400000;
    if (today < start) {
      setCountdown(`距离出发还有 ${Math.round((start - today) / DAY)} 天`);
    } else if (today > end) {
      setCountdown('旅程已结束 · 好好休息');
    } else {
      setCountdown(`行程进行中 · 第 ${Math.round((today - start) / DAY) + 1} 天`);
    }
  }, []);

  const toggle = (key) =>
    setDone((prev) => {
      const next = { ...prev };
      if (next[key]) delete next[key];
      else next[key] = 1;
      return next;
    });

  return (
    <>
      <Icons />
      <div className="wrap">
        <header className="hero">
          <div className="tricolor" />
          <p className="eyebrow">Manchester · Liverpool · Oxford · London</p>
          <h1>英国十日</h1>
          <p className="hero-dates">2026 年 8 月 23 日 — 9 月 1 日</p>
          {countdown && <p className="countdown">{countdown}</p>}

          <div className="route">
            <span className="route-chip is-plain" style={{ gap: 5 }}>
              <svg width="13" height="13"><use href="#i-send" /></svg>抵达
            </span>
            <span className="route-sep">→</span>
            <span className="route-chip is-man">曼彻斯特 <span className="nights">2 晚</span></span>
            <span className="route-sep">→</span>
            <span className="route-chip is-liv">利物浦 <span className="nights">2 晚</span></span>
            <span className="route-sep">→</span>
            <span className="route-chip is-oxf">牛津 <span className="nights">1 晚</span></span>
            <span className="route-sep">→</span>
            <span className="route-chip is-ldn">伦敦 <span className="nights">4 晚</span></span>
            <span className="route-sep">→</span>
            <span className="route-chip is-plain" style={{ gap: 5 }}>
              <svg width="13" height="13"><use href="#i-send" /></svg>回国
            </span>
          </div>

          <div className="stats">
            <div className="stat"><b>10</b><span>天</span></div>
            <div className="stat"><b>4</b><span>座城市</span></div>
            <div className="stat"><b>9</b><span>晚</span></div>
          </div>
        </header>

        <div className="sec-title"><h2>每日行程</h2><small>Itinerary</small></div>

        <section className="timeline">
          {DAYS.map((d) => (
            <article
              key={d.key}
              className={`day${done[d.key] ? ' done' : ''}`}
              style={{ '--dot': d.color, '--chip-bg': d.chipBg }}
            >
              <div className="day-date">
                <span className="dnum">{d.date}</span>
                <span className="dmonth">{d.month}</span>
                <span className="dweek">{d.week}</span>
              </div>
              <div className="day-rail"><span className="dot" /></div>
              <div className="day-card">
                <div className="day-head">
                  <span className="day-tag">DAY {d.day}</span>
                  <span className="city-chip">{d.city}</span>
                  {d.badges?.map((b) => (
                    <span key={b.text} className={`badge ${b.cls}`}>
                      <svg><use href={`#${b.icon}`} /></svg>{b.text}
                    </span>
                  ))}
                  <button
                    className="check"
                    title="勾选这一天"
                    aria-label="勾选这一天"
                    onClick={() => toggle(d.key)}
                  >
                    <svg><use href="#i-check" /></svg>
                  </button>
                </div>
                {d.desc && !d.descAfterTransit && <p className="day-desc">{d.desc}</p>}
                {d.transit && (
                  <div className="transit">
                    {d.transit.map((leg, i) => (
                      <Fragment key={`${leg.name}-${i}`}>
                        {i > 0 && (
                          <span className="t-arrow"><svg><use href="#i-arr" /></svg></span>
                        )}
                        <span className="leg">
                          {leg.name}
                          {leg.sub && <small>{leg.sub}</small>}
                        </span>
                      </Fragment>
                    ))}
                    {d.flyTime && <span className="fly-time">{d.flyTime}</span>}
                  </div>
                )}
                {d.meta && (
                  <div className="t-meta">
                    {d.meta.map((m) => <span key={m}>{m}</span>)}
                    {d.map && (
                      <a href={d.map.href} target="_blank" rel="noreferrer">{d.map.label}</a>
                    )}
                  </div>
                )}
                {d.desc && d.descAfterTransit && <p className="day-desc">{d.desc}</p>}
                <div className="day-stay">
                  <svg><use href={`#${d.stayIcon || 'i-home'}`} /></svg>
                  {d.stayPlain
                    ? d.stay
                    : <>住宿 · <b>{d.stay}</b>{d.staySuffix}</>}
                </div>
              </div>
            </article>
          ))}
        </section>
        <p className="hint">点击每张卡片右侧的圆圈，可以勾掉已完成的行程</p>

        <div className="sec-title"><h2>住宿一览</h2><small>Lodging</small></div>
        <section className="lodging">
          {LODGING.map((l) => (
            <div key={l.city} className="lodge-card">
              <h3><span className="swatch" style={{ background: l.color }} />{l.city}</h3>
              <p>{l.range}</p>
              <div className="nn">{l.nights} <small>晚</small></div>
            </div>
          ))}
        </section>

        <div className="sec-title"><h2>火车与航班</h2><small>Transport</small></div>
        <div className="t-scroll">
          <table className="t-table">
            <thead>
              <tr><th>日期</th><th>区间</th><th>时间</th></tr>
            </thead>
            <tbody>
              {TRANSPORT.map((t) => (
                <tr key={t.date}>
                  <td>{t.date}</td>
                  <td className="route-cell">
                    <b>{t.from}</b><span className="arr">→</span><b>{t.to}</b>
                    <span className="note">{t.note}</span>
                  </td>
                  <td className="tt">{t.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer>
          <div className="tricolor" />
          英国十日 · 2026 年夏末<br />
          <button onClick={() => setDone({})}>重置全部勾选</button>
        </footer>
      </div>
    </>
  );
}
