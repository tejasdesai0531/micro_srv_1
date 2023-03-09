const stan = require('node-nats-streaming')


class NatsWrapper {
    #client;
    
    getClient() {
        if(!this.#client) {
            throw new Error('Cannon access NATS Client before connecting')
        }

        return this.#client
    }

    connect() {
        this.#client = stan.connect('test-cluster', 'micro-srv-1', {
            url: 'nats://44.204.41.148:4222',
        });

        return new Promise((resolve, reject) => {
            this.#client.on('connect', () => {
                console.log('Connected to NATS');
                resolve()
            })
            this.#client.on('error', (err) => {
                reject(err)
            })
        })
    }
}

module.exports = new NatsWrapper()