export function setupNotificationCounter(element: HTMLElement) {
  let count = 0;

  const update = () => {
    element.textContent = `${count}`;
  };

  return {
    increment() {
      count++;
      update();
    },
    reset() {
      count = 0;
      update();
    },
  };
}
