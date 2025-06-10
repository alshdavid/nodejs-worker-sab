import { parentPort } from 'node:worker_threads'

parentPort?.on('message', (data) => {
  console.log(data)
  const b = new Uint8Array(1)
  b[0] = 2
  data.set(b)
  console.log(data)
})