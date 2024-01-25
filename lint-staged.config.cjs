module.exports = {
   '*': () => 'yarn format:fix',
   '*.(js|jsx|ts|tsx)': () => 'pnpm validate',
};
