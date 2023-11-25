import { ImageIcon } from "lucide-react";
import selectImage from "./helpers/selectImage";
import shuffleArray from "./helpers/shuffle";
import * as z from "zod";


export const ImageformSchema = z.object({
  prompt: z.string().min(1, {
    message: "Photo prompt is required"
  }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
});

export const amountOptions = [
  {
    value: "1",
    label: "1 Photo"
  },
  {
    value: "2",
    label: "2 Photos"
  },
  {
    value: "3",
    label: "3 Photos"
  },
  {
    value: "4",
    label: "4 Photos"
  },
  {
    value: "5",
    label: "5 Photos"
  }
];

export const resolutionOptions = [
  {
    value: "256x256",
    label: "256x256",
  },
  {
    value: "512x512",
    label: "512x512",
  },
  {
    value: "1024x1024",
    label: "1024x1024",
  },
];


export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required."
  }),
});


export const MAX_FREE_COUNTS = 5;

export const tools = [
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
    href: "/image",
  },
];

export const images = [
  "/chat.png",
  "/home.png",
  "/transcript.png",
  "/voice.png",
  "/photo.png",
  "/mail.png",
  "/pro.png",
  "/logo.png",
];


export const dashboard = selectImage(images);
export const userHistory = [
  { twoDImage: images[ Math.floor(Math.random() * images.length)], threeDImage: images[ Math.floor(Math.random() * images.length)] },
  { twoDImage: images[ Math.floor(Math.random() * images.length)], threeDImage: images[ Math.floor(Math.random() * images.length)] },
  { twoDImage: images[ Math.floor(Math.random() * images.length)], threeDImage: images[ Math.floor(Math.random() * images.length)] },
];
export const userGenerated = [shuffleArray(images), shuffleArray(images)]

export const randomImage = images[Math.floor(Math.random() * images.length)]