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
