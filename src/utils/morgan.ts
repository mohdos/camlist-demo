import morgan from 'morgan';


const logDirectory = process.cwd();

export default morgan('[date[web] [:remote-addr :remote-user]'
  + ' ["HTTP/:http-version :method :url"] [:referrer] [:user-agent] [:req[header]]'
  + ' [:res[content-length]] [:res[header]] [:status] [:response-time ms]');
