interface Props {
  size: number;
  color?: string;
  bgColor?: string;
  style?: object;
}

const Loading = ({
  style,
  size,
  bgColor = "transparent",
  color = "white",
}: Props): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={style}
      height={size}
      width={size}
      enableBackground={"#FFFFFF"}
      viewBox="0 0 32 32"
    >
      <path
        opacity=".25"
        d="M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"
        fill={bgColor}
      />
      <path d="M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z" fill={color}>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 16 16"
          to="360 16 16"
          dur="0.8s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};

export default Loading;
