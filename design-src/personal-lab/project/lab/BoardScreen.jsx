/* FENGZIAAA Lab — Ideas Kanban (Roadmap). Drag cards across mission stages. */
const { useState: useStateB, useRef: useRefB, useEffect: useEffectB } = React;

const BOARD_COLUMNS = [
  { id: 'backlog', label: 'Backlog',   tone: 'var(--cyan)',   icon: 'inbox' },
  { id: 'explore', label: 'Exploring', tone: 'var(--purple)', icon: 'compass' },
  { id: 'build',   label: 'Building',  tone: 'var(--amber)',  icon: 'hammer' },
  { id: 'shipped', label: 'Shipped',   tone: 'var(--green)',  icon: 'rocket' },
];

function BoardCard({ card, onDragStart, onAdvance }) {
  const [h, setH] = useStateB(false);
  return (
    <div draggable onDragStart={(e) => onDragStart(e, card.id)}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      className="fz-panel"
      style={{ '--notch-size': '9px', '--frame': `color-mix(in srgb, ${card.tone} 50%, var(--line))`, padding: '12px 13px', marginBottom: 10, cursor: 'grab', transition: 'transform .15s var(--ease-hud)', transform: h ? 'translateY(-2px)' : 'none', boxShadow: h ? `inset 0 0 0 1px ${card.tone}, 0 0 22px -10px ${card.tone}` : undefined }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span className="fz-orb" style={{ width: 12, height: 12, background: card.hex, boxShadow: `0 0 10px -1px ${card.hex}` }} />
        <span style={{ fontFamily: 'var(--font-techno)', fontWeight: 700, fontSize: 14, color: 'var(--text-bright)', flex: 1 }}>{card.title}</span>
        <Tag tone={card.tone}>{card.tag}</Tag>
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--text-dim)', marginBottom: 11 }}>{card.note}</div>
      {card.progress > 0 && <div style={{ marginBottom: 11 }}><ProgressBar value={card.progress} tone={card.hex} height={5} showValue /></div>}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--green)' }}>
          <Icon n="chevron-up" size={13} color="var(--green)" />{card.votes}
        </span>
        {card.stage !== 'shipped' && (
          <button type="button" onClick={() => onAdvance(card.id)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'none', border: '1px solid var(--line-dim)', color: 'var(--text-dim)', fontFamily: 'var(--font-techno)', fontWeight: 600, fontSize: 9, letterSpacing: '.12em', textTransform: 'uppercase', padding: '4px 8px', borderRadius: 3, cursor: 'pointer' }}>
            Advance <Icon n="arrow-right" size={11} color="var(--text-dim)" />
          </button>
        )}
      </div>
    </div>
  );
}

function BoardColumn({ col, cards, onDrop, onDragStart, onAdvance }) {
  const [over, setOver] = useStateB(false);
  return (
    <div onDragOver={(e) => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)}
      onDrop={(e) => { setOver(false); onDrop(e, col.id); }}
      className="fz-panel"
      style={{ '--notch-size': '12px', '--frame': over ? col.tone : `color-mix(in srgb, ${col.tone} 38%, var(--line))`, display: 'flex', flexDirection: 'column', minHeight: 0, transition: 'box-shadow .2s', boxShadow: over ? `inset 0 0 0 1px ${col.tone}, 0 0 30px -8px ${col.tone}` : undefined }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 15px', borderBottom: '1px solid var(--line-dim)' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontFamily: 'var(--font-techno)', fontWeight: 600, fontSize: 12, letterSpacing: '.18em', textTransform: 'uppercase', color: col.tone }}>
          <Icon n={col.icon} size={15} color={col.tone} />{col.label}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-dim)' }}>{cards.length}</span>
      </div>
      <div className="fz-scroll" style={{ flex: 1, overflowY: 'auto', padding: '13px' }}>
        {cards.map((c) => <BoardCard key={c.id} card={c} onDragStart={onDragStart} onAdvance={onAdvance} />)}
        {cards.length === 0 && (
          <div style={{ textAlign: 'center', padding: '28px 0', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-faint)', border: '1px dashed var(--line-faint)', borderRadius: 4 }}>drop ideas here</div>
        )}
      </div>
    </div>
  );
}

function BoardScreen({ d, onNewIdea }) {
  const [cards, setCards] = useStateB(d.board);
  const dragId = useRefB(null);
  useEffectB(() => { window.lucide && window.lucide.createIcons(); });

  const onDragStart = (e, id) => { dragId.current = id; e.dataTransfer.effectAllowed = 'move'; };
  const onDrop = (e, stage) => {
    const id = dragId.current; if (!id) return;
    setCards((cs) => cs.map((c) => c.id === id ? { ...c, stage, progress: stage === 'shipped' ? 100 : c.progress } : c));
    dragId.current = null;
  };
  const onAdvance = (id) => {
    const order = BOARD_COLUMNS.map((c) => c.id);
    setCards((cs) => cs.map((c) => {
      if (c.id !== id) return c;
      const next = order[Math.min(order.length - 1, order.indexOf(c.stage) + 1)];
      return { ...c, stage: next, progress: next === 'shipped' ? 100 : c.progress };
    }));
  };
  const shipped = cards.filter((c) => c.stage === 'shipped').length;

  return (
    <div className="boardscreen" style={{ gap: 16, paddingTop: 70 }}>
      <div className="board-head">
        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
          <img src="assets/logo-mark.svg" alt="fz" style={{ width: 42, height: 42, filter: 'drop-shadow(0 0 10px rgba(46,230,246,.45))' }} />
          <div>
            <div className="fz-wordmark" style={{ fontSize: 27, letterSpacing: '.14em' }}>IDEAS BOARD</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-dim)', marginTop: 2 }}>100 ideas mission · drag a card to change its stage</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
          <StatItem label="Total Ideas" value={cards.length} tone="var(--cyan)" glow align="right" />
          <StatItem label="Shipped" value={shipped} tone="var(--green)" glow align="right" />
          <StatItem label="Mission" value="63 / 100" tone="var(--magenta)" glow align="right" />
          <NeonButton variant="outline" tone="var(--green)" icon={<Icon n="plus" size={15} />} onClick={onNewIdea}>New Idea</NeonButton>
        </div>
      </div>
      <div className="board-cols">
        {BOARD_COLUMNS.map((col) => (
          <BoardColumn key={col.id} col={col} cards={cards.filter((c) => c.stage === col.id)} onDrop={onDrop} onDragStart={onDragStart} onAdvance={onAdvance} />
        ))}
      </div>
    </div>
  );
}

window.BoardScreen = BoardScreen;
