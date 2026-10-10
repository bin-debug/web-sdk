// Local-only POC RGS. Outcomes are deliberately non-certified and never used for wagering.
import baseConfig from 'config-vite';

const symbols = ['🍒', '🎩', '🎠', '🎟️', '🌙', '💎', '🪙'];
const sample = () => symbols[Math.floor(Math.random() * symbols.length)];
const board = () => Array.from({ length: 25 }, sample);

const config = baseConfig();
config.server = {
  ...(config.server ?? {}),
  allowedHosts: ['thor.tail8ad778.ts.net']
};
config.plugins ??= [];
config.plugins.push({
  name: 'midnight-mishap-demo-rgs',
  configureServer(server) {
    server.middlewares.use('/api/spin', (_req, res) => {
      const grid = board();
      const winning = Math.random() < 0.7;
      if (winning) [0, 1, 5, 6, 10].forEach((i) => (grid[i] = '🍒'));
      const expander = Math.random() < 0.26 ? 4 : -1;
      if (expander >= 0) [4, 9, 14, 19, 24].forEach((i) => (grid[i] = '🎩'));
      const bonus = Math.random() < 0.12;
      if (bonus) [2, 12, 22].forEach((i) => (grid[i] = '🎟️'));
      const payload = {
        board: grid,
        win: winning ? Number((0.4 + Math.random() * 4.6).toFixed(2)) : 0,
        clusters: winning ? [0, 1, 5, 6, 10] : [],
        expander,
        bonus,
        freeSpins: bonus ? 8 : 0,
        tumble: winning ? board() : null
      };
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify(payload));
    });
  }
});
export default config;
