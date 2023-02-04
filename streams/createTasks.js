import fs from "node:fs";
import { parse } from "csv-parse";

const csvFile = new URL("./tasks.csv", import.meta.url);
const stream = fs.createReadStream(csvFile, "utf-8");
const csvParse = parse({
  delimiter: ",",
  skipEmptyLines: true,
  fromLine: 2,
});

async function saveTask(title, description) {
  const response = await fetch("http://localhost:3333/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });

  const isCreated = response.status === 201;

  if (!isCreated) {
    console.log("Error creating task:\n", title, description);
  } else {
    console.log("Task created:\n", title, description);
  }
}

async function readTasks() {
  const lines = stream.pipe(csvParse);

  for await (const [title, description] of lines) {
    await saveTask(title, description);
  }
}

readTasks();
