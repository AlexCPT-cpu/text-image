import { UserSquare2Icon, GridIcon } from "lucide-react";
import { useRouter } from "next/router";
import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import ImageModal from "@/components/ImageModal";
import Press from "@/components/SliderImage";
import { CameraIcon } from "@heroicons/react/24/outline";
import SliderImage from "@/components/SliderImage";
import axios from "axios";
import { Pic } from "@prisma/client";
import { clerkClient } from "@clerk/nextjs";

export default function ProfilePage() {
  const imag1 = [
    "/home.png",
    "/logo.png",
    "/mail.png",
    "/photo.png",
    "/transcript.png",
    "/chat.png",
    "/empty.png",
    "/home.png",
    "/logo.png",
    "/mail.png",
    "/photo.png",
    "/transcript.png",
    "/voice.png",
    "/home.png",
    "/logo.png",
    "/mail.png",
    "/photo.png",
    "/transcript.png",
  ];

  const router = useRouter();

  const fetchUserById = useCallback(
    async (userId: any) => {
      try {
        const user = await axios.post("/api/user", { userId: userId });
        if (user) {
          console.log("User found");
        } else {
          console.log("User not found.");
        }
      } catch (error) {
        //@ts-ignore
        console.error("Error fetching user by ID:", error?.message);
        router.push("/nouser");
      }
    },
    [router]
  );

  const { profileId } = router.query;
  const [slider, setSlider] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>(imag1);

  const handleSlide = (slide: number, state: boolean) => {
    setSlider(state);
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleImageClick = (imageSrc: any) => {
    setIsOpen(true);
    setSelectedImage(imageSrc);
    document.body.classList.add("overflow-hidden"); // Disable scrolling on modal open
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedImage(null);
    document.body.classList.remove("overflow-hidden"); // Enable scrolling on modal close
  };

  useEffect(() => {
    const fetchImages = async () => {
      const { data } = await axios.get("/api/history");
      const imgs = data?.pictures?.map((items: Pic) => {
        return items?.threeDImage;
      });
      setImages(imgs);
    };
    if (profileId) {
      fetchUserById(profileId);
    }

    // fetchImages();
  }, [profileId, fetchUserById]);

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
              Explore Your Generated Images
            </h2>
          </div>
          <div className="flex flex-row items-center justify-between w-full px-6 space-x-8 mt-10 md:mt-[106px]">
            <div className="p-2 rounded-lg bg-gray-300 cursor-pointer hover:bg-gray-200 transition-all w-full text-center active:bg-gray-400">
              Edit
            </div>
            <div className="p-2 rounded-lg bg-gray-300 cursor-pointer hover:bg-gray-200 transition-all w-full text-center active:bg-gray-400">
              Share
            </div>
          </div>

          <div className="hidden md:flex flex-row items-center justify-between w-full px-6 space-x-2 mt-10 md:mt-[50px]">
            <div
              onClick={() => handleSlide(0, false)}
              className="justify-center flex flex-col transition-all w-full text-center"
            >
              <div className="flex w-full justify-center">
                <GridIcon size={30} />
              </div>
              <div
                className={`w-full border-b-2 mt-2 transition-all ${
                  slider ? "border-b-gray-100" : "border-b-black"
                }`}
              ></div>
            </div>
            <div
              onClick={() => handleSlide(1, true)}
              className="justify-center flex flex-col transition-all w-full text-center"
            >
              <div className="flex w-full justify-center">
                <UserSquare2Icon size={30} />
              </div>
              <div
                className={`w-full border-b-2 mt-2 transition-all ${
                  slider ? "border-b-black" : "border-b-gray-100"
                }`}
              ></div>
            </div>
          </div>

          <div className="flex md:hidden flex-row items-center justify-between w-full px-6 mt-10 md:mt-[106px]">
            <div
              onClick={() => handleSlide(0, false)}
              className="justify-center flex flex-col transition-all w-full text-center"
            >
              <div className="flex w-full justify-center">
                <GridIcon />
              </div>
              <div
                className={`w-full border-b-2 mt-2 transition-all ${
                  slider ? "border-b-gray-100" : "border-b-black"
                }`}
              ></div>
            </div>
            <div
              onClick={() => handleSlide(1, true)}
              className="justify-center flex flex-col transition-all w-full text-center"
            >
              <div className="flex w-full justify-center">
                <UserSquare2Icon />
              </div>
              <div
                className={`w-full border-b-2 mt-2 transition-all ${
                  slider ? "border-b-black" : "border-b-gray-100"
                }`}
              ></div>
            </div>
          </div>

          <div className="mt-1 h-[calc(100vh-280px)] overflow-y-auto scrollbar-hide">
            {images?.length > 0 ? (
              images?.map((image, index) => (
                <SliderImage
                  key={index}
                  image={image}
                  handleImageClick={handleImageClick}
                />
              ))
            ) : (
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
          </div>
        </div>
      </main>
    </div>
  );
}
