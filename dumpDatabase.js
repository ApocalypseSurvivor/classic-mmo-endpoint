import { exec } from "child_process";

const dumpDatabase = (dbPath, dumpPath) => {
  const command = `sqlite3 ${dbPath} .dump > ${dumpPath}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error dumping database: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Database dumped to ${dumpPath}`);
  });
};

dumpDatabase("data.sqlite", "dump.sql");
