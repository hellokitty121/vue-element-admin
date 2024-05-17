
// import EventBus from '@/eventBus';
class Socket {
    constructor() {
        // 基础URL
        this.baseUrl = `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}`;
        // 最终的URL
        this.webSocketUrl = null;
        // webSocket实例
        this.ws = null;
        // 重连timeId
        this.reconnectTimer = 0;
        // 重连主动触发timeId
        this.emitReconnectTimer = 0;
        // 心跳timeId
        this.heartBeatTimer = 0;
        // 心跳失效关闭定时器
        this.receiverTimer = 0;
        // 暂存消息
        this.cacheMessage = [];
    }

    /**
     * 初始化
     * @param url websocket url
     */
    init(url) {
        if ('WebSocket' in window) {
            if (url) {
                this.webSocketUrl = url;
            }
            this.ws = new WebSocket(this.webSocketUrl);
            console.error("建立链接=======",this.ws)
            this._bindListeners();
        } else {
            console.log('你的浏览器不支持WebSocket');
        }
    }

    /**
     * 手动关闭
     */
    close() {
        if (this.ws) {
            this.clearHeartBeat();
            this.ws.close();
        }
    }

    /**
     * 判断webSocket是否已连接
     * @returns {null|boolean}
     */
    ready() {
        return this.ws && this.ws.readyState === WebSocket.OPEN;
    }

    /**
     * 发送消息
     * @param message
     */
    sendMessage(message) {
        if (this.ready()) {
            console.error("发送消息=====",message)
            this.ws.send(message);
        } else {
            this.cacheMessage.push(message);
        }
    }

    /**
     * 心跳机制
     */
    heartBeat() {
        this.clearHeartBeat();
        this.heartBeatTimer = setTimeout(() => {
            this.ws.send('ping');
            console.error("心跳======",'ping')
            // this.receiverTimer = setTimeout(() => {
            //     this.close();
            // }, 2000);
        }, 2000);
    }

    /**
     * 清理心跳
     */
    clearHeartBeat() {
        if (this.heartBeatTimer) {
            clearTimeout(this.heartBeatTimer);
            this.heartBeatTimer = 0;
        }
        if (this.receiverTimer) {
            clearTimeout(this.receiverTimer);
            this.receiverTimer = 0;
        }
    }

    /**
     * 重连
     */
    reconnect() {
        this.destroyed();
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = 0;
        }
        if (this.emitReconnectTimer) {
            clearTimeout(this.emitReconnectTimer);
            this.emitReconnectTimer = 0;
        }
        this.reconnectTimer = setTimeout(() => {
            this.init();
            // 重连后主动触发相应请求
            // this.emitReconnectTimer = setTimeout(() => {
                // EventBus.$emit('reconnect');
            // }, 1000);
        }, 2000);
    }

    /**
     * 销毁webSocket
     */
    destroyed() {
        if (this.ws) {
            this.clearHeartBeat();
            this._unbindListeners();
            if (this.ready()) {
                this.ws.close();
            }
            this.ws = null;
        }
    }

    /**
     * 监听webSocket
     * @private
     */
    _bindListeners() {
        this.ws.onopen = e => {
            console.error('链接成功======',e);
            this.heartBeat();
            if (this.cacheMessage && this.cacheMessage.length) {
                this.cacheMessage.forEach(message => {
                    this.sendMessage(message);
                    console.error("重连发的消息======",message)
                });
                this.cacheMessage = [];
            }
        };
        this.ws.onmessage = e => {
            console.error("收到数据=======",e)
            if (e.data === 'pong') {
                this.clearHeartBeat();
                this.heartBeat();
            } else {
                // eslint-disable-next-line no-unused-vars
                const data = JSON.parse(e.data);
                // 此处就可以对接受的数据进行处理
                // 可以通过
            }
        };
        this.ws.onclose = e => {
            console.log('链接关闭========', e);
            this.reconnect();
        };
        this.ws.onerror = e => {
            console.log('WebSocket onerror', e);
            this.reconnect();
        };
    }

    /**
     * 解除绑定
     * @private
     */
    _unbindListeners() {
        this.ws.onopen = null;
        this.ws.onmessage = null;
        this.ws.onclose = null;
        this.ws.onerror = null;
    }
}

export default new Socket();
