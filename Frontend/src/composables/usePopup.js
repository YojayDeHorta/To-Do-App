import { inject } from 'vue';

export function usePopup() {
  const showPopup = inject('showPopup');
  if (!showPopup) throw new Error('error con el popup');
  return showPopup;
}