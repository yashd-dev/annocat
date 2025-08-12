import FadeIn from "@/components/fadein";
import Features from "@/components/features";
import GetExtension from "@/components/getExtension";
import { Button } from "@/components/ui/button";
import HeroHeader from "@/components/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <HeroHeader></HeroHeader>
      <section className="h-screen w-full flex flex-col justify-center items-center p-16 px-4 bg-background overflow-hidden text-foreground relative">

        <div className="absolute top-0 bottom-0 mx-auto left-1/2 transform -translate-x-1/2 z-0 w-full md:w-[1200px] lg:w-[1600px] max-w-screen opacity-45">
          <img src="/shapes/1.svg" className="hidden lg:block w-full h-full object-cover" alt="Shapes" />
          <img src="/shapes/2.svg" className="md:hidden w-full h-full object-cover" alt="Shapes" />
        </div>
        <div className="w-full  mx-auto flex flex-col justify-center items-center space-y-8 md:space-y-[65px] pt-12 lg:pt-[150px] relative z-20">
          <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto gap-5 text-center">
            <FadeIn>
              <h1 className="text-5xl font-extrabold   text-zinc-900 dark:text-white md:text-7xl mb-6 font-uncut">
                Save & Organize the Web, <span className="text-yellow ">Effortlessly</span>
              </h1>{" "}
            </FadeIn>
            <FadeIn delay={0.5}>
              <h3 className="mt-4 text-lg md:text-xl font-normal text-zinc-500 md:max-w-3xl md:mx-auto mb-6 md:mb-10  ">
                Your web research, organized — capture, annotate, share. No
                clutter. No hassle.
              </h3>
            </FadeIn>
            <FadeIn delay={1}>
              <a href="/login">
                <Button size="lg" className="bg-blue hover:bg-light-blue dark:text-white">
                  Lets Collect them Links!
                </Button>
              </a>
            </FadeIn>
          </div>
          <FadeIn delay={1.5}>

            <p className="text-foreground text-center flex-1 block">
              Made With 💗 By{" "}
              <a
                href="https://github.com/yashd-dev"
                className="text-teal-500 dark:text-teal-400  hover:underline underline-offset-4 decoration-teal-500"
              >
                Yash D
              </a>
            </p>
          </FadeIn>

        </div>
      </section>
    </>
  );
}
