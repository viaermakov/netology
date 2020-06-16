export interface IPerson {
  id: number;
  favourite: boolean;
  name: string;
  age: number;
  phone: string;
  image: string;
  phrase: string;
  video?: string;
}

export interface IIconProps {
  w?: number;
  h?: number;
  className?: string;
  onClick?: () => void;
}
