const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
    #state = PENDING
    #result = undefined
    #thenables = []

    constructor(executor) {
        const resolve = (data) => {
            this.#changeState(FULFILLED, data)
        }
        const reject = (error) => {
            this.#changeState(REJECTED, error)
        }

        try {
            executor(resolve, reject)
        } catch (error) {
            // 坑点1: 如果执行器出现异步错误，是无法捕获到的，官方也捕获不到，Promise 的状态无法改变
            reject(error)
        }
    }

    #changeState(state, result) {
        // 如果状态被改变过，直接返回
        if(this.#state !== PENDING) return
        this.#state = state
        this.#result = result
        this.#run()
    }

    #handleCallBack(callback, resolve, reject) {
        // then 方法传入的可能不是一个回调函数：p.then(123) ,
        // 坑点2：会出现状态穿透，如果 then 传入的不是函数，则返回的 Promise 的状态和 上一个 Promise（p） 的状态保持一致
        if(typeof callback !== 'function') {
            queueMicrotask(() => {
                const settled = this.#state === FULFILLED ? resolve : reject
                settled(this.#result)
            })
            return
        }
        queueMicrotask(() => {
            try {
                const result = callback(this.#result)
                // 坑点3: 如果then 的回调函数返回了一个 Promise，则等待它的状态改变后，再改变 then 返回的 Promise 的状态
                // 最终 then 返回的 这个 Promise fullfilled 的值会传给下一个then
                if (result instanceof MyPromise) {
                  result.then(resolve, reject)
                } else {
                  // 普通值，直接 resolve
                  resolve(result)
                }
            } catch (error) {
                reject(error)
            }
        })
    }

    #run() {
        if(this.#state === PENDING) return
        while(this.#thenables.length) {
            const {onFulfilled, onRejected, resolve, reject} = this.#thenables.shift()
            if(this.#state === FULFILLED) {
                this.#handleCallBack(onFulfilled, resolve, reject)
            } else if(this.#state === REJECTED) {
                this.#handleCallBack(onRejected, resolve, reject)
            }   
        }
    }

    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            this.#thenables.push({
                onFulfilled,
                onRejected,
                resolve,
                reject
            })
            this.#run()
        })
    }

}