import test from "ava";
import compile from "..";

const compileAndRun = (src, imports) =>
  WebAssembly.instantiate(compile(src), imports);
const outputIs = (t, value) => result =>
  t.is(result.instance.exports.test(), value);

test("memory can be defined", t =>
  compileAndRun(
    `
  const memory: Memory = { 'initial': 2, max: 2 };

  export function test(): i32 {
    let x: i32[] = 0;
    let y: i32 = 5;
    x[0] = 21;
    x[y] = 2;
    return x[0] * x[y];
  }`
  ).then(outputIs(t, 42)));

test("memory can be imported", t => {
  const memory = new WebAssembly.Memory({ initial: 1 });
  const view = new Int32Array(memory.buffer);
  view[1024] = 42;
  return compileAndRun(
    `
  import { memory: Memory } from 'env';
  export function test(): i32 {
    const pointer: i32[] = 0;
    return pointer[1024];
  }
  `,
    { env: { memory } }
  ).then(outputIs(t, 42));
});
