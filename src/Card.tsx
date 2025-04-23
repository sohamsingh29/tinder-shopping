import { motion, useMotionValue, useTransform } from "motion/react";
import { easeOut } from "motion";
import AfterActionAnimation from "./afterActionAnimation";
import cart from "./assets/basket.png";
import thumbsdown from "./assets/circle.png";
import thumbsup from "./assets/heart.png";

interface ProductDataIF {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  imageUrl: string;
  onAddToCart: (id: number) => void;
  onLike: (id: number) => void;
  onDislike: (id: number) => void;
}

const Card = ({
  brand,
  name,
  price,
  originalPrice,
  discountPercentage,
  imageUrl,
  onAddToCart,
  onLike,
  onDislike,
  id,
}: ProductDataIF) => {
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const rotate = useTransform(offsetX, [-200, 0, 200], [-10, 0, 10], {
    ease: easeOut,
  });
  const opacityX = useTransform(offsetX, [-300, 0, 300], [0, 1, 0], {
    ease: easeOut,
  });
  const opacityY = useTransform(offsetY, [-300, 0, 300], [0, 1, 0], {
    ease: easeOut,
  });
  const opacity = useTransform(() => {
    if (offsetX.get() !== 0) {
      return opacityX.get();
    } else if (offsetY.get() < 0) {
      return opacityY.get();
    }
    return 1;
  })

  return (<>
<AfterActionAnimation action="add" src={cart} value={offsetY} inputRange={[0,-200]} />
<AfterActionAnimation action="dislike" src={thumbsdown} value={offsetX} inputRange={[0,-200]} />
<AfterActionAnimation action="like" src={thumbsup} value={offsetX} inputRange={[0,200]} />
    <motion.div
      drag
      whileDrag={{ scale: 1.1 }}
      dragConstraints={{ bottom: 0 }}
      dragElastic={0.1}
      dragMomentum={false}
      dragDirectionLock
      dragSnapToOrigin
      onDragEnd={(_, { offset,velocity }) => {
        if (Math.abs(offset.x) > 200 || velocity.x > 500) {
          if (offset.x > 0) {
            onLike(id);
          } else {
            onDislike(id);
          }
        }
        if (offset.y < -200 || velocity.y >500) {
          onAddToCart(id);
        }
      }}
      style={{
        backgroundImage: `url(${imageUrl})`,
        x: offsetX,
        y: offsetY,
        rotate: rotate,
        opacity: opacity,
      }}
      className={`max-w-sm absolute left-0 right-0 top-4 bottom-4 mx-4 overflow-clip rounded-2xl inset-shadow-2xs bg-cover bg-center`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
      <div className="p-4 absolute bottom-0 left-0 right-0 bg-[rgba(0, 0, 0, 0.5)] text-white">
        <p className="font-bold"> {brand}</p>
        <h2 className="text-lg line-clamp-2 font-bold capitalize">
          {name} 
        </h2>
        <p>
          {discountPercentage > 0 ? (<>
            <span className="line-through text-red-300">₹ {originalPrice}</span>
            <span className="text-red-300 font-bold"> -{discountPercentage}%</span>
            <span className="text-gray-400"> | </span>
            <span className="text-white text-lg font-bold">₹ {price}</span>
      
          </>):(
            <span className="text-white text-lg font-bold">₹ {originalPrice}</span>
          )}
         
        </p>
      </div>
    </motion.div>
    </>
  );
};

export default Card;
