import { Vector3 } from 'three';

export enum TreeState {
  FORMED = 'FORMED',
  CHAOS = 'CHAOS',
}

export enum ImageSize {
  SIZE_1K = '1K',
  SIZE_2K = '2K',
  SIZE_4K = '4K',
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface PolaroidData {
  id: string;
  textureUrl: string; // Base64 or URL
  position: [number, number, number];
  rotation: [number, number, number];
  chaosPosition: [number, number, number];
}

export interface HandGesture {
  gesture: string; // "Open_Palm", "Closed_Fist", "None"
  x: number; // Normalized 0-1
  y: number; // Normalized 0-1
}
