const ws = require('nodejs-websocket')
const port = 3003
var user = 0
const server = ws.createServer((connection) => {
  user += 1
  connection.nickname = 'user' + user

  // 客户端链接成功之后,服务端主动给客户端发送一个消息
  let mes = {}
  mes.type = 'enter' // 消息类型 enter 进入聊天室  message 客户端主动发送消息进来
  mes.count = user
  mes.data = '用户' + connection.nickname + '进来了'
  broadcast(JSON.stringify(mes))

  // 监听客户端建立链接
  console.log('客户端连接了')

  // 监听客户端发送的消息
  connection.on('text', (str) => {
    // 当客户端主动发送消息过来, 我们服务端给客户端主动推动一条消息
    mes.type = 'message'
    mes.data = connection.nickname + '说:' + str
    broadcast(JSON.stringify(mes))
  })

  // 监听客户端断开链接
  connection.on('close', () => {
    console.log('客户端断开链接')
    mes.type = 'leave'
    mes.data = connection.nickname + ' 离开了'
    broadcast(JSON.stringify(mes))
  })
})

function broadcast(str) {
  // 获取到所有连接客户端
  server.connections.forEach((connection) => {
    // 将客户端发送的消息转发给所有连接的客户端
    connection.sendText(str)
  })
}
server.listen(port)
