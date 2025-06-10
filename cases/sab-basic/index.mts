import { Worker } from "node:worker_threads";
import * as url from "node:url";
import * as path from "node:path";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const sab = new SharedArrayBuffer(1)
const bytes = new Uint8Array(sab)

console.log(bytes)
bytes[0] = 1
console.log(bytes)

const w = new Worker(path.join(__dirname, 'worker.mts'))
w.unref()
w.postMessage(bytes)

setTimeout(() => {
  console.log(bytes)
}, 500)
