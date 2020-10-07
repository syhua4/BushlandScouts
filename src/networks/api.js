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

export function scanImage(file) {
  console.log(file);
  return request({
    url: '/scan',
    method: 'POST',
    data: file,
    headers: { 'Content-Type': 'multipart/form-data' }
  });
}

export function uploadReport(formData) {
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

export function searchNearbyWeed(zip) {
  return request({
    url: '/zip',
    params: {
      zip
    }
  });
}

export function getWeedInfo(id) {
  return request({
    url: '/weedinfo',
    params: {
      id
    }
  });
}
