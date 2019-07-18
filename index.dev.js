let fp = require('find-process');

(async () => {
  let port = process.env.PORT || 5000;
  let pids = await fp('port', port);
  if (pids.length > 0) {
    console.warn(
      `Port {port} is occupied by another process before starting the server, of which the details are as follows: 
        pid: ${pids[0].pid}
        ppid: ${pids[0].ppid}
        Free the port before run the server!
      `
    );
    return;
  }
  require('./index');
})();
