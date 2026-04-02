import request from '@/utils/request/index.js'

export function apiGetStationDetail(id) {
	return request.request({
		url: '/charge/station/'+id,
		method: 'GET',		
		authType: 'None'
	})
}
