const { Publisher } = require('@simply-eat/common')

class ProductCreatedPublisher extends Publisher {

    getSubject() { return 'product:created' }
}

module.exports = ProductCreatedPublisher