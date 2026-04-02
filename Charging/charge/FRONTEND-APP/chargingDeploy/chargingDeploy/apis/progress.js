import request from '@/utils/request/index.js'

export function apiProgress(id) {
	return request.request({
		url: '/charge/process/'+id,
		method: 'GET',		
		authType: 'None'
	})
}
