enum TextColor {
  Red = "\x1b[31m%s\x1b[0m",
  Green = "\x1b[32m%s\x1b[0m",
  Yellow = "\x1b[33m%s\x1b[0m",
  Blue = "\x1b[34m%s\x1b[0m",
  White = "\x1b[37m%s\x1b[0m"
}

export const msgStartServer = (address: string, port: number) => {
  console.log(TextColor.Green, `** Server starts at http://${address}:${port} ** \n`);
};

export const msgStartProcess = (type: string, pid: number) => {
  if (type === 'Master') {
    console.log(TextColor.Yellow, `${type} started with pid: ${pid}`);
  } else {
    console.log(TextColor.Blue, `${type} started with pid: ${pid}`);
  }
};

export const msgStopProcess = (pid: number, code: number) => {
  console.log(TextColor.Red, `Worker ${pid} finished with code ${code}`);
};

export const msgServerError = (err: any) => {
  console.log(TextColor.Red, `Server error: ${err}`)
}
