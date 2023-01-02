import chalk from 'chalk';

export const msgStartServer = (address: string, port: number) => {
  console.log(chalk.green(`** Server starts at http://${address}:${port} ** \n`));
};

export const msgStartProcess = (type: string, pid: number) => {
  if (type === 'Master') {
    console.log(chalk.yellow(`${type} started with pid: ${pid}`));
  } else {
    console.log(chalk.blue(`${type} started with pid: ${pid}`));
  }
};

export const msgStopProcess = (pid: number, code: number) => {
  console.log(chalk.red(`Worker ${pid} finished with code ${code}`));
};
