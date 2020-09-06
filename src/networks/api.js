import { request } from './request';

export function getAnimals() {
  return request({
    url: '/animals'
  });
}

export function getPlants(page = 1) {
  return request({
    url: '/plants',
    params: { page }
  });
}
