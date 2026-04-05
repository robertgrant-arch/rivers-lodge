const LEGEND = [
  { label: 'Available', bg: 'bg-available', border: 'border-river/20' },
  { label: 'Limited', bg: 'bg-hold', border: 'border-bark/20' },
  { label: 'Reserved', bg: 'bg-booked', border: 'border-stone/30' },
] as const
export function CalendarLegend() {
  return (
    <div className="flex flex-wrap items-center gap-4 mt-5" aria-label="Calendar availability legend">
      {LEGEND.map(({ label, bg, border }) => (
        <div key={label} className="flex items-center gap-2">
          <span className={`w-4 h-4 rounded border ${bg} ${border}`} aria-hidden />
          <span className="font-mono text-[11px] tracking-[0.08em] text-bark uppercase">{label}</span>
        </div>
      ))}
    </div>
  )
}
