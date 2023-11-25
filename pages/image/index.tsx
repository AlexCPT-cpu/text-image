"use client";

import * as z from "zod";
import axios from "axios";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { HiPhoto } from "react-icons/hi2";
import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { ArrowRightCircleIcon, ShareIcon } from "@heroicons/react/24/outline";
import { Loader } from "@/components/loader";
import { Empty } from "@/components/ui/empty";
import { useProModal } from "@/hooks/use-pro-modal";
import { CldUploadButton } from "next-cloudinary";
import { ImageformSchema } from "@/constants";
import { Sidebar } from "@/components/sidebar";
import { TwitterShareButton } from "react-share";
import Navbar from "@/components/navbar";
import { userHistory } from "@/constants";
import { randomImage } from "@/constants";

const PhotoPage = () => {
  const proModal = useProModal();
  const [photos, setPhotos] = useState<any[]>(userHistory);
  const [image, setImage] = useState<string>("");
  const [hostname, setHostname] = useState("");

  const form = useForm<z.infer<typeof ImageformSchema>>({
    resolver: zodResolver(ImageformSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = useCallback(async () => {
    try {
      // const response = await axios.post("/api/image", { inputImage: image });
      // const urls = response.data;
      // console.log(urls);
      // //setPhotos(urls);
      // toast.success("Images Generated.");
    } catch (error: any) {
      if (error?.response?.status === 403) {
      } else {
        toast.error("Something went wrong.");
        console.log(error);
      }
    } finally {
      //router.refresh();
    }
  }, []);
  const handleImageUpload = (result: any) => {
    setImage(result.info.secure_url);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentHostname = window.location.hostname;
      setHostname(currentHostname);
    } else {
      // Handle the case where window is not available (Server-side rendering)
      console.log("Window object is not available (SSR)");
    }
  }, []);

  const scrollToRef = () => {
    const element = document.getElementById("end-of-page");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const addToArray = () => {
    setPhotos((prev: any) => [
      ...prev,
      { twoDImage: image ? image : randomImage, threeDImage: randomImage },
    ]);
    setTimeout(() => scrollToRef(), 1000);
    setImage("");
  };
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900">
        <Sidebar isPro={true} apiLimitCount={0} />
      </div>
      <main className="md:pl-72 pb-10">
        <Navbar />
        <div>
          <Heading
            title="Image Generation"
            description="Turn your image into a 3D image."
            icon={ImageIcon}
            iconColor="text-pink-700"
            bgColor="bg-pink-700/10"
          />
          <div className="px-4 lg:px-8">
            <div className="whitespace-nowrap flex justify-center items-center text-center font-bold text-lg md:text-2xl mb-5">
              Click the photo to upload an image
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
              className="flex flex-col md:flex-row border border-black rounded-lg p-2 items-center"
            >
              <div className="flex w-full justify-center items-center text-center">
                <CldUploadButton
                  options={{ maxFiles: 1 }}
                  onUpload={handleImageUpload}
                  uploadPreset="ohepb2bt"
                >
                  <HiPhoto size={50} className="text-sky-500" />
                </CldUploadButton>
              </div>

              <Button
                className="col-span-12 lg:col-span-2 w-full"
                type="submit"
                disabled={isLoading}
                size="icon"
                onClick={addToArray}
              >
                Generate
              </Button>
            </form>
            {isLoading && (
              <div className="p-20">
                <Loader />
              </div>
            )}
            {photos?.length === 0 && !isLoading && (
              <Empty label="No images generated." />
            )}
            <div className="h-full overflow-y-auto scrollbar-hide flex flex-col justify-center gap-6 w-full mt-10 items-center">
              {photos?.map(
                (item: { twoDImage: string; threeDImage: string }, index) => (
                  <div
                    className="flex flex-row items-center justify-center space-x-2"
                    key={index + item?.twoDImage}
                  >
                    <Card className="rounded-lg overflow-hidden">
                      <div className="relative aspect-square">
                        <Image
                          className="w-64"
                          width={200}
                          height={200}
                          alt="Generated"
                          src={item?.twoDImage}
                        />
                      </div>
                      <CardFooter className="p-2">
                        <TwitterShareButton
                          url={
                            item?.twoDImage.startsWith("/")
                              ? `https://${hostname}${item?.twoDImage}`
                              : item?.twoDImage
                          }
                          title="AI image Generated by Brain AI"
                          className="w-full"
                        >
                          <div className="flex w-full h-10 px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 justify-center items-center text-center">
                            <ShareIcon className="h-4 w-4 mr-2" />
                            Share
                          </div>
                        </TwitterShareButton>
                      </CardFooter>
                    </Card>
                    <ArrowRightCircleIcon className="text-black w-10 md:w-8" />
                    <Card className="rounded-lg overflow-hidden">
                      <div className="relative aspect-square">
                        <Image
                          className="w-64"
                          width={200}
                          height={200}
                          alt="Generated"
                          src={item?.threeDImage}
                        />
                      </div>
                      <CardFooter className="p-2">
                        <TwitterShareButton
                          url={
                            item?.twoDImage.startsWith("/")
                              ? `https://${hostname}${item?.threeDImage}`
                              : item?.threeDImage
                          }
                          title="AI image Generated by Brain AI"
                          className="w-full"
                        >
                          <div className="flex w-full h-10 px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 justify-center items-center">
                            <ShareIcon className="h-4 w-4 mr-2" />
                            Share
                          </div>
                        </TwitterShareButton>
                      </CardFooter>
                    </Card>
                  </div>
                )
              )}
            </div>
            <div className="end" id="end-of-page"></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PhotoPage;
