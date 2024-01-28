module.exports = {
   '*': () => 'pnpm format:fix',
   '*.(js|jsx|ts|tsx)': () => 'pnpm validate',
};
