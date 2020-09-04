import { request } from './request';

export function getAnimals() {
  return request({
    url: '/animals'
  });
}

export function getPlants() {
  return request({
    url: '/plants'
  });
}
