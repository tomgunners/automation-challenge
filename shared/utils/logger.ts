type LogLevel = 'INFO' | 'WARN' | 'ERROR';

function log(level: LogLevel, message: string) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level}] ${message}`);
}

export const logger = {
  info: (message: string) => log('INFO', message),
  warn: (message: string) => log('WARN', message),
  error: (message: string) => log('ERROR', message)
};
