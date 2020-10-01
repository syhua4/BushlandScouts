import { request } from './request';

export function getAnimals(page = 1) {
  return request({
    url: '/animals',
    params: { page }
  });
}

export function getPlants(page = 1) {
  return request({
    url: '/plants',
    params: { page }
  });
}

export function uploadReport(formData) {
  console.log('1111');
  return request({
    url: '/report',
    method: 'POST',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  });
}

export function getWeedLocation(lon, lat) {
  return request({
    url: '/locations',
    params: {
      lon,
      lat
    }
  });
}
