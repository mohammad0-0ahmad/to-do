import { Capacitor } from '@capacitor/core';

export const isWeb = Capacitor.getPlatform() === 'web';
export const isAndroid = Capacitor.getPlatform() === 'android';
export const isIos = Capacitor.getPlatform() === 'isIos';
