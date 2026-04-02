/* process.env.NODE_ENV设置生产环境模式 */
// http://118.187.50.119:55562
// const baseURL = process.env.NODE_ENV === "production" ? "http://192.168.88.174:30000" : "http://192.168.88.171:30000" // 接口前缀
// 生产环境
const baseURL = process.env.NODE_ENV === "production" ? "https://skly.szsszx.com" : "http://192.168.88.171:30000" // 接口前缀

const mapBaseURL = process.env.NODE_ENV === "production" ? "https://apis.map.qq.com" : "" // 接口前缀

const define = {
	baseURL: baseURL,
	mapBaseURL,
	webSocketUrl: process.env.NODE_ENV === "production" ? "wss://app.java.jnpfsoft.com/websocket" :
		"ws://localhost:30000/api/message/websocket",
	comUploadUrl: baseURL + '/api/file/Uploader/',
	timeout: process.env.NODE_ENV === 'production' ? 1000000 : 1000000,
	report: process.env.NODE_ENV === 'development' ? 'http://localhost:8200' : baseURL + '/Report'
}


export default define
