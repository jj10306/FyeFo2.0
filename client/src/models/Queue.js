class Queue {
    constructor() {
        this.CAPACITY = 25;
        this.arr = new Array(this.CAPACITY);
        this.arr.fill(null);
        this.front = 0;
        this.back = 0;
        this.size = 0;
    }
    enqueue(student) {
        if (this.size === this.CAPACITY) {
            return "Queue is full!"
        }
        this.arr[this.back] = student
        this.back = (this.back + 1) % this.arr.length
        this.size += 1
    }
    dequeue() {
        if (this.size === 0) {
            return "Queue is empty!"
        }
        const returned = this.arr[this.front]
        if (this.size === 1) {
            this.clear();
            return returned;
        }
        this.arr[this.front] = null
        this.front = (this.front + 1) % this.arr.length
        this.size -= 1
        return returned
    }
    size() {
        return this.size;
    }
    clear() {
        this.CAPACITY = 25;
        this.arr = new Array(this.CAPACITY);
        this.arr.fill(null);
        this.front = 0;
        this.back = 0;
        this.size = 0;
        this.totalWait = 0;
        this.totalHelped = 0;
    }
    contains(name) {
        for (let i = this.front; i < this.back; i++) {
            if (name === this.arr[i].name) {
                return true;
            }
        }
        return false;
    }
    asArray() {
        let array = []
        if (this.size === this.CAPACITY) {
            let pos = this.front;
            for (let i = 0; i < this.CAPACITY; i++) {
                array.push(this.arr[pos])
                pos = (pos + 1) % this.CAPACITY;
            }
        } else {
            for (let i = this.front; i < this.back; i++) {
                array.push(this.arr[i])
            }
        }
        return array;
    }

}

export default Queue;