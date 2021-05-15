export class Emitter {
    constructor() {
        this.listeners = {}
    }

    // dispatch, fire, trigger
    // table.emit('table:select', {a:1})
    emit(eventName, ...args) {
        if (!Array.isArray(this.listeners[eventName])) {
            return false
        }
        this.listeners[eventName].forEach(listener => {
            listener(...args)
        })
        return true
    }

    // on, listen
    // formula.subscribe('table:select', () => {})
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)
        return () => {
            this.listeners[event] =
                this.listeners[event].filter(listener => listener !== fn)
        }
    }
}

// Example
// const emitter = new Emitter()
//
// const unsub = emitter.subscribe('gven', data => console.log('Sub: ', data))
// emitter.emit('21313131321', 42)
//
//
// setTimeout(() => {
//     emitter.emit('gven', 'After 2 seconds')
// }, 2000)
//
// setTimeout(() => {
//     unsub()
// }, 3000)
//
// setTimeout(() => {
//     emitter.emit('gven', 'After 4 seconds')
// }, 4000)
