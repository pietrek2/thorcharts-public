import axios from 'axios'

const baseUrl = window.location.hostname === 'localhost' ? 'http://localhost:8080' : '' // window.location.origin
// 'http://localhost:3000' //window.location.origin

export const getBackendData = async (section: string, queryName: string) => {
	const result = await axios.get(baseUrl + '/' + section + '/' + queryName)
	return result.data
}
