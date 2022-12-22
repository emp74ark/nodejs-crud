import chalk from 'chalk';

export const msgStartServer = (address: string, port: number) => {
  console.log(chalk.bgGray(`** Server starts at http://${address}:${port} ** \n`));
};
