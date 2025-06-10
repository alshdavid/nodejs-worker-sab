import proto from "protobufjs";

const MAX_MESSAGE_BYTES = 1024 * 100;

export class SharedStruct {
  #bytes: Uint8Array
  #def: proto.Type

  static fromInit(def: proto.Type, init: any): SharedStruct {
    const value = def.create(init);
    const encoded = def.encode(value).finish();

    const sab = new SharedArrayBuffer(
      encoded.length,
      // @ts-expect-error
      { maxByteLength: MAX_MESSAGE_BYTES }
    );

    const bytes = new Uint8Array(sab)
    bytes.set(encoded)

    const struct = new SharedStruct()
    struct.#bytes = bytes
    struct.#def = def
    return struct
  }

  static fromBytes(def: proto.Type, bytes: Uint8Array): SharedStruct {
    const struct = new SharedStruct()
    struct.#bytes = bytes
    struct.#def = def
    return struct
  }

  getProperty(key: string): any {
    return this.#getProto()[key];
  }

  setProperty(key: string, value: any) {
    const proto = this.#getProto();
    proto[key] = value;
    const encoded = this.#def.encode(proto).finish();
    if (encoded.length > this.#bytes.length) {
      // @ts-expect-error
      this.#bytes.buffer.grow(encoded.length);
    }
    this.#bytes.set(encoded)
  }

  #getProto(): any {
    return this.#def.decode(this.#bytes) as any;
  }

  asBytes(): Uint8Array {
    return this.#bytes
  }
}
