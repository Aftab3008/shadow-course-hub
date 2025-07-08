import { ReactNode } from "react";

export interface OrbitIcon {
  component: () => ReactNode;
  className: string;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  reverse?: boolean;
}

export interface Testimonials {
  text: string;
  image: string;
  name: string;
  role: string;
}
