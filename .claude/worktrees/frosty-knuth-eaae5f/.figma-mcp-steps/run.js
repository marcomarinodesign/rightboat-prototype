const doc = figma.root;
const n = parseInt(doc.getSharedPluginData("rbt", "hc_n") || "0", 10);
let b64 = "";
for (let i = 0; i < n; i++) {
  b64 += doc.getSharedPluginData("rbt", "hc" + i) || "";
}
function utf8BytesToString(bytes) {
  let out = "";
  let i = 0;
  while (i < bytes.length) {
    const c = bytes[i++];
    if (c < 0x80) {
      out += String.fromCharCode(c);
    } else if (c < 0xe0) {
      out += String.fromCharCode(((c & 0x1f) << 6) | (bytes[i++] & 0x3f));
    } else if (c < 0xf0) {
      out += String.fromCharCode(
        ((c & 0x0f) << 12) | ((bytes[i++] & 0x3f) << 6) | (bytes[i++] & 0x3f)
      );
    } else {
      const u =
        ((c & 0x07) << 18) |
        ((bytes[i++] & 0x3f) << 12) |
        ((bytes[i++] & 0x3f) << 6) |
        (bytes[i++] & 0x3f);
      const v = u - 0x10000;
      out += String.fromCharCode(0xd800 + (v >> 10), 0xdc00 + (v & 0x3ff));
    }
  }
  return out;
}
function b64ToUtf8(b) {
  const bin = atob(b);
  const bytes = new Uint8Array(bin.length);
  for (let j = 0; j < bin.length; j++) bytes[j] = bin.charCodeAt(j);
  return utf8BytesToString(bytes);
}
const __src = b64ToUtf8(b64);
const __run = new Function("return (async () => {\n" + __src + "\n})();");
return await __run();
