import proto from "protobufjs";

const MAX_MESSAGE_BYTES = 1024 * 100;

// Get from .proto file
const AssetProto = new proto.Type("Asset").add(
  new proto.Field("content", 1, "string")
);

export type AssetInit = {
  content: string;
};

export class Asset {
  #bytes: Uint8Array;

  get content(): string {
    return this.#getProperty("content");
  }

  set content(value: string) {
    this.#setProperty("content", value);
  }

  #getProperty(key: string): any {
    return this.#getProto()[key];
  }

  #setProperty(key: string, value: any) {
    const proto = this.#getProto();
    proto[key] = value;
    const encoded = AssetProto.encode(proto).finish();
    if (encoded.length > this.#bytes.length) {
      // @ts-expect-error
      this.#bytes.buffer.grow(encoded.length);
    }
    this.#bytes.set(encoded)
  }

  #getProto(): AssetInit {
    const p = AssetProto.decode(this.#bytes) as any;
    return p
  }

  static fromInit(init: AssetInit): Asset {
    const value = AssetProto.create(init);
    const encoded = AssetProto.encode(value).finish();

    const sab = new SharedArrayBuffer(
      encoded.length,
      // @ts-expect-error
      { maxByteLength: MAX_MESSAGE_BYTES }
    );

    const buffer = new Uint8Array(sab);
    buffer.set(encoded);

    const asset = new Asset();
    asset.#bytes = buffer
    return asset;
  }

  static fromBytes(bytes: Uint8Array): Asset {
    const asset = new Asset();
    asset.#bytes = bytes;
    return asset;
  }

  toBytes(): Uint8Array {
    return this.#bytes;
  }
}
