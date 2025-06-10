import proto from "protobufjs";
import { SharedStruct } from "./shared-struct.mts";

// Get from .proto file
const AssetProto = new proto
  .Type("Asset")
  .add(new proto.Field("content", 1, "string"));

export type AssetInit = {
  content: string;
};

export class Asset {
  #struct: SharedStruct

  get content(): string {
    return this.#struct.getProperty('content')
  }

  set content(value: string) {
    this.#struct.setProperty("content", value);
  }

  static fromInit(init: AssetInit) {
    const asset = new Asset()
    asset.#struct = SharedStruct.fromInit(AssetProto, init)
    return asset
  }

  static fromBytes(bytes: Uint8Array): Asset {
    const asset = new Asset()
    asset.#struct = SharedStruct.fromBytes(AssetProto, bytes);
    return asset;
  }

  asBytes(): Uint8Array {
    return this.#struct.asBytes();
  }
}
