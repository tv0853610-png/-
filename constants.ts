export const COLORS = {
  EMERALD: '#004225',
  GOLD: '#FFD700',
  GOLD_HIGHLIGHT: '#FFFACD',
  RED_RIBBON: '#8B0000',
  SILVER: '#C0C0C0',
  DARK_BG: '#051a12'
};

export const GEM_COLORS = [
  '#E0115F', // Ruby
  '#0F52BA', // Sapphire
  '#50C878', // Emerald Green (lighter)
  '#9966CC', // Amethyst
  '#FFC87C', // Topaz
  '#40E0D0', // Turquoise
  '#FFD700', // Gold
  '#C0C0C0', // Silver
  '#FF0000', // Bright Red
  '#32CD32', // Lime Green (for leaf variance)
];

export const CONFIG = {
  TREE_HEIGHT: 15,
  TREE_RADIUS: 6,
  PARTICLE_COUNT: 15000, // Increased for a massive cloud effect
  ORNAMENT_COUNT: 2500,  // Massive count to fill all gaps
  POLAROID_COUNT: 10,
  CAMERA_POS: [0, 4, 20] as [number, number, number],
};

export const MODEL_NAMES = {
  CHAT: 'gemini-3-pro-preview',
  IMAGE: 'gemini-3-pro-image-preview',
};