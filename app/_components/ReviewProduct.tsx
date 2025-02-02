import Image from "next/image";
import { urlFor } from "../_lib/client";
import { SanityDocument } from "next-sanity";

function ReviewProduct({
  cartProduct,
  className,
}: {
  cartProduct: SanityDocument;
  className?: string;
}) {
  const { image, title, price, quantity, size } = cartProduct;
  const imageUrl = image ? urlFor(image)?.width(309).height(309).url() : null;

  return (
    <div className={`flex items-center gap-4 py-4 ${className}`}>
      <div>
        <Image
          alt="a"
          width={75}
          height={75}
          src={imageUrl!}
          className="rounded"
        />
      </div>
      <div className="flex flex-col space-y-2 font-normal text-lg">
        <h1 className="text-lg font-bold">{title}</h1>
        <span>${(price * quantity).toFixed(2)}</span>
        <p>Size: {size}</p>
      </div>
    </div>
  );
}

export default ReviewProduct;
