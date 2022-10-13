type EasingOptions = {
  duration?: number;
  property?: string;
};

export const easing = {
  smooth: (options: EasingOptions = {}) => {
    const { duration, property } = options;

    return `${duration ? `${duration}ms` : ""} ${property || ""} cubic-bezier(0.65, 0.05, 0.36, 1)`;
  },
};
