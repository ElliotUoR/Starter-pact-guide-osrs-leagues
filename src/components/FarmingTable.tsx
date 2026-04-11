export default function FarmingTable() {
  const normalTrees = [
    { name: 'Oak',    qty: 3, spare: 1, fail: '27%', note: '' },
    { name: 'Willow', qty: 4, spare: 1, fail: '34%', note: '' },
    { name: 'Maple',  qty: 6, spare: 2, fail: '47%', note: 'Nearly a coin flip — bring spares' },
    { name: 'Yew',    qty: 2, spare: 1, fail: '19%', note: '80 min timer; losing one hurts' },
  ];

  const fruitTrees = [
    { name: 'Apple',     qty: 1, spare: 1, fail: '10%', note: 'Failed run = 3h 12m lost' },
    { name: 'Curry',     qty: 1, spare: 1, fail: '10%', note: '' },
    { name: 'Pineapple', qty: 1, spare: 1, fail: '10%', note: '' },
    { name: 'Papaya',    qty: 1, spare: 1, fail: '10%', note: 'Final critical run — always bring spare' },
  ];

  return (
    <div className="mt-3 space-y-4">
      {/* Normal Trees */}
      <div className="rounded-md border border-green-900 overflow-hidden">
        <div className="bg-green-950/80 px-3 py-1.5 border-b border-green-900 flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-green-400" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1C5 1 3 4 3 6.5c0 1.5.6 2.8 1.5 3.7L4 14h8l-.5-3.8C12.4 9.3 13 8 13 6.5 13 4 11 1 8 1z" />
          </svg>
          <span className="text-xs font-bold text-green-400 uppercase tracking-wide">Normal Trees</span>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-green-950/50 text-green-500 border-b border-green-900/60">
              <th className="text-left px-3 py-1.5 font-semibold">Sapling</th>
              <th className="text-center px-2 py-1.5 font-semibold">Qty</th>
              <th className="text-center px-2 py-1.5 font-semibold">+Spare</th>
              <th className="text-center px-2 py-1.5 font-semibold">≥1 Fails</th>
              <th className="text-left px-3 py-1.5 font-semibold hidden sm:table-cell">Note</th>
            </tr>
          </thead>
          <tbody>
            {normalTrees.map((row, i) => (
              <tr
                key={row.name}
                className={`border-b border-green-900/40 ${i % 2 === 0 ? 'bg-green-950/20' : 'bg-transparent'}`}
              >
                <td className="px-3 py-1.5 text-green-200 font-medium">{row.name}</td>
                <td className="px-2 py-1.5 text-center text-green-300 font-mono">×{row.qty}</td>
                <td className="px-2 py-1.5 text-center text-green-400 font-mono">+{row.spare}</td>
                <td className="px-2 py-1.5 text-center text-green-500">{row.fail}</td>
                <td className="px-3 py-1.5 text-green-600 hidden sm:table-cell">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Fruit Trees */}
      <div className="rounded-md border border-green-900 overflow-hidden">
        <div className="bg-green-950/80 px-3 py-1.5 border-b border-green-900 flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-green-400" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 2a3 3 0 0 0-3 3c0 .8.3 1.5.8 2H4a1 1 0 0 0 0 2h.5L5 13h6l.5-4H12a1 1 0 0 0 0-2h-1.8c.5-.5.8-1.2.8-2a3 3 0 0 0-3-3z" />
          </svg>
          <span className="text-xs font-bold text-green-400 uppercase tracking-wide">Fruit Trees</span>
        </div>
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-green-950/50 text-green-500 border-b border-green-900/60">
              <th className="text-left px-3 py-1.5 font-semibold">Sapling</th>
              <th className="text-center px-2 py-1.5 font-semibold">Qty</th>
              <th className="text-center px-2 py-1.5 font-semibold">+Spare</th>
              <th className="text-center px-2 py-1.5 font-semibold">≥1 Fails</th>
              <th className="text-left px-3 py-1.5 font-semibold hidden sm:table-cell">Note</th>
            </tr>
          </thead>
          <tbody>
            {fruitTrees.map((row, i) => (
              <tr
                key={row.name}
                className={`border-b border-green-900/40 last:border-0 ${i % 2 === 0 ? 'bg-green-950/20' : 'bg-transparent'}`}
              >
                <td className="px-3 py-1.5 text-green-200 font-medium">{row.name}</td>
                <td className="px-2 py-1.5 text-center text-green-300 font-mono">×{row.qty}</td>
                <td className="px-2 py-1.5 text-center text-green-400 font-mono">+{row.spare}</td>
                <td className="px-2 py-1.5 text-center text-green-500">{row.fail}</td>
                <td className="px-3 py-1.5 text-green-600 hidden sm:table-cell">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
