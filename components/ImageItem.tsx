import Image from "next/image";

export default function ImageItem({
  image,
  handleImageClick,
}: {
  image: string;
  handleImageClick: (img: string) => void;
}) {
  return (
    <div
      onClick={() => handleImageClick(image)}
      className="relative inline-block transition-all w-1/3 md:w-1/4 lg:w-1/6 px-2 mb-4"
    >
      <Image
        width={150}
        height={150}
        src={image}
        layout="responsive"
        alt="Image"
        className="transition-all w-full rounded-lg shadow-md drop-shadow-xl"
      />
    </div>
  );
}
