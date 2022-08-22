import mitt from 'mitt'
const emitter = mitt()
const Bus = {
  $on: emitter.on,
  $off: emitter.off,
  $emit: emitter.emit,
  $all: emitter.all
}
export default Bus
