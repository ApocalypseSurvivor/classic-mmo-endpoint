import { exec } from "child_process";

const loadDatabase = (dbPath, dumpPath) => {
  const command = `sqlite3 ${dbPath} < ${dumpPath}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error loading database: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Database loaded from ${dumpPath}`);
  });
};

loadDatabase("data.sqlite", "dump.sql");
