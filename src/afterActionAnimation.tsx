import { useTransform, motion, MotionValue } from "motion/react";

const AfterActionAnimation = ({
  action,
  src,
  value,
  inputRange = [0, 1],
}: {
  action: "like" | "dislike" | "add";
  src: string;
  value: MotionValue<number>;
  inputRange?: number[];
}) => {
  const opacity = useTransform(value, inputRange, [0, 1]);
  const scale = useTransform(value,inputRange, [0.5, 5]);
  return (
    <motion.img
      src={src}
      alt={action}
      style={{ opacity, scale }}
      className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10"
    />
  );
};

export default AfterActionAnimation;
