export class CommandStack {

    size: number;
    stack: Array<{type: string, data: object}> = [];
    pointer = -1;
    commands = {};

    /**
     * 命令栈
     * @param size 命令栈的大小, 默认为20 
     */
    constructor(size = 20) {
        this.size = size;
    }

    /**
     * 注册命令
     * @param type 类型 
     * @param redo 重做时执行的函数
     * @param undo 
     */
    register(type: string, redo: Function, undo: Function) {
        this.commands[type] = { redo, undo }
    }

    push(type: string, data: object) {
        if (this.pointer < this.stack.length-1) {
            this.stack.splice(this.pointer+1);
            this.pointer = this.stack.length;
        } else if (this.stack.length >= this.size) this.stack.shift();
        else this.pointer++;
        data = this.commands[type].redo(data, true);
        this.stack.push({ type, data });
    }

    hasBack() { return this.pointer >= 0; }

    undo() {
        if (!~this.pointer) return false;
        const command = this.stack[this.pointer--];
        this.commands[command.type].undo(command.data);
        return true;
    }

    hasNext() { return this.pointer < this.stack.length-1; }

    redo() {
        if (this.pointer >= this.stack.length-1) return false;
        const command = this.stack[++this.pointer];
        this.commands[command.type].redo(command.data);
        return true;
    }

    clear() {
        this.stack = [], this.pointer = -1;
    }
}