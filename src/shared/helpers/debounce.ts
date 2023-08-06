export default function debounce<Func extends (...args: any[]) => void>(
  func: Func,
  wait: number = 1500,
  immediate: boolean = false,
) {
  let timeoutId: number | undefined;

  return (...args: Parameters<Func>): void => {
    const later = function () {
      timeoutId = undefined;
      if (!immediate) func(args);
    };

    const callNow = immediate && !timeoutId;

    clearTimeout(timeoutId);

    timeoutId = window.setTimeout(later, wait);

    if (callNow) {
      func(args);
    }
  };
}
