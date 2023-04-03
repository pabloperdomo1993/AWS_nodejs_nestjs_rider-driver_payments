import { Module } from '@nestjs/common';
import { DateTime } from 'luxon';
import { CalculateTime, CalculateDistance } from '../interfaces/index';

export function calculateTimeInMinutes(data: CalculateTime) {
  const init = DateTime.fromJSDate(data.initDate).toMillis();
  const end = DateTime.fromJSDate(data.endDate).toMillis();
  const diff = (end - init) / (1000 * 60);
  return Math.round(diff);
}

export function calculateDistance(data: CalculateDistance) {
  const radioEarth = 6371; // Radious Earth in km
  const dLat = ((data.latitudeEnd - data.latitudeInit) * Math.PI) / 180;
  const dLon = ((data.longitudeEnd - data.longitudeInit) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((data.latitudeInit * Math.PI) / 180) *
      Math.cos((data.latitudeEnd * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = radioEarth * c; // Distance in km
  return distance;
}

@Module({})
export class UtilsModule {
  static calculateTimeInMinutes = calculateTimeInMinutes;
  static calculateDistance = calculateDistance;
}
