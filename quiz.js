let fernet = require("fernet");
let secret = new fernet.Secret('TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=');
let message = 'gAAAAABcEQLEd1X2g03KQ9T8VSMIqhvEVksX9b-Fk1pC2iC6B3PX8pg0rRXwk5i5zY_KP30HSf_zrcOX7G8xqLvlHTNDHtqD6BoH-1lOSVDAIwq7Izox4j8zuJzUfxLulqCiB2TJS1nUU0sF41axGJB1ky2afXurziQgYeMt4LLKWpfAX8qLFXSTNhgnLtZXY8JHYfLtrTvI'
let token = new fernet.Token({secret, token: message, ttl:0})
console.log(token.decode());