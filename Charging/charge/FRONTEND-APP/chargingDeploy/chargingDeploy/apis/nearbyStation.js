import request from '@/utils/request/index.js'

export function apiGetNearbyStation(data) {
	return request.request({
		url: '/charge/station/nearbyList?longitude='+data.longitude+'&latitude='+data.latitude+'&radius='+data.radius,
		method: 'GET',		
		authType: 'None'
	})
}
