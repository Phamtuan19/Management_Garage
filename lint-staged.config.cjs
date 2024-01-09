module.exports = {
   '*': () => 'yarn format:fix',
   '*.(js|jsx|ts|tsx)': () => 'yarn validate',
};
