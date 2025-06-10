import { parentPort } from 'node:worker_threads'
import {Asset} from './asset.mts' 

parentPort?.on('message', (data) => {
  const asset = Asset.fromBytes(data)
  console.log('worker', asset.content)
  asset.content = "b";
  console.log('worker', asset.content)
})
