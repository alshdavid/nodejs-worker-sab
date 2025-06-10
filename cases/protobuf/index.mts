import { Worker } from "node:worker_threads";
import * as url from "node:url";
import * as path from "node:path";
import {Asset} from './asset.mts' 

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

const asset = Asset.fromInit({
  content: "a",
});

console.log('main', asset.content)

const w = new Worker(path.join(__dirname, 'worker.mts'))
w.unref()
w.postMessage(asset.toBytes())

setTimeout(() => {
  console.log('main', asset.content)
}, 1000)
