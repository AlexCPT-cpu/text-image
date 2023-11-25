import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { CameraIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import ImageModal from "@/components/ImageModal";
import ImageItem from "@/components/ImageItem";
import axios from "axios";
import { dashboard } from "@/constants";
import Image from "next/image";
import ImgModal from "@/components/Modal";

export default function DashboardPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dashboardImg, setDashboard] = useState([]);
  const [images, setImages] = useState<any>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  useEffect(() => {
    setDashboard(dashboard);
  }, []);

  const handleImageClick = (imageSrc: any) => {
    setIsOpen(true);
    setSelectedImage(imageSrc);
    document.body.classList.add("overflow-hidden");
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedImage(null);
    document.body.classList.remove("overflow-hidden");
  };
  useEffect(() => {
    const fetchImages = async () => {
      const { data } = await axios.get("/api/dapp");
      const dappImages = data?.map((history: any) => {
        return history?.pictures?.threeDImage;
      });
      setImages(dappImages);
    };

    fetchImages();
  }, []);

  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900">
        <Sidebar isPro={true} apiLimitCount={0} />
      </div>
      <main className="md:pl-72 pb-10">
        <Navbar />
        <div>
          <div className="mb-8 space-y-4">
            <h2 className="text-2xl md:text-4xl font-bold text-center">
              Explore the power of AI
            </h2>
            <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
              Chat with the smartest AI - Experience the power of AI
            </p>
          </div>
          <div className="w-full border-b border-b-black mb-5"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 items-center">
            {dashboardImg?.length > 0 ? (
              dashboard?.map((images: string[], index: number) => {
                return (
                  <div
                    onClick={() => {
                      setSelectedImages(images);
                      setIsOpenModal(true);
                    }}
                    className="flex flex-wrap border-black m-1 border-2 rounded-lg cursor-pointer hover:border-neutral-300 transition-all"
                    key={images[0] + index + images[3]}
                  >
                    {images?.map((image, indexI) => (
                      <div
                        className="w-1/2 md:w-1/2 p-1 justify-center items-center flex cursor-pointer"
                        key={indexI + image + images[2]}
                      >
                        <Image
                          width={50}
                          height={50}
                          src={image}
                          alt={image}
                          className="inset-0 object-scale-down rounded-lg w-20 h-20"
                        />
                      </div>
                    ))}
                  </div>
                );
              })
            ) : (
              //   images?.map((image: string, index: number) => (
              //     <ImageItem
              //       key={index}
              //       image={image}
              //       handleImageClick={handleImageClick}
              //     />
              //   )
              // )
              <div className="flex justify-center items-center flex-col w-full mt-28">
                <div className="ring-2 ring-black rounded-full">
                  <CameraIcon className="w-16 md:w-20 text-black p-2" />
                </div>
                <div className="font-bold text-xl md:text-4xl mt-5 md:mt-10">
                  No Images Yet
                </div>
              </div>
            )}
            {selectedImage && (
              <ImageModal
                isOpen={isOpen}
                src={selectedImage}
                onClose={handleCloseModal}
              />
            )}
            <ImgModal
              selectedImages={selectedImages}
              isOpen={isOpenModal}
              setIsOpen={setIsOpenModal}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
