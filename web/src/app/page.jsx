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
      <section className="min-h-screen w-full flex flex-col justify-center items-center py-16 px-4 bg-background overflow-hidden text-foreground">
        <div className="w-full  mx-auto flex flex-col justify-center items-center space-y-8 md:space-y-[65px] pt-12 lg:pt-[150px]">
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
              <GetExtension />
            </FadeIn>
          </div>

          {/* <FadeIn delay={1.1}>
            <div className="relative mx-auto w-full overflow-hidden rounded-2xl bg-gray-900 will-change-transform md:aspect-[1360/725] mt-16">
              <video
                autoPlay
                loop
                muted
                playsInline
                width="1360"
                height="725"
                className="md:block rounded-2xl overflow-hidden mx-auto w-full h-auto"
                style={{ background: "#000" }}
                poster="https://placehold.co/1360x725/000000/FFFFFF?text=Your+Web+Research+Dashboard"
              >
                <source
                  src="https://framerusercontent.com/assets/xczsI9Xq2X6OvsvU8NVUiUJUXuA.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </FadeIn> */}
          <p className="text-foreground text-center flex-1 block">
            Made With 💗 By{" "}
            <a
              href="https://github.com/yashd-dev"
              className="text-teal-500 dark:text-teal-400  hover:underline underline-offset-4 decoration-teal-500"
            >
              Yash D
            </a>
          </p>
        </div>

      </section>
      {/* <section className="min-h-screen w-full flex flex-col justify-center items-center py-16 px-4 bg-background overflow-hidden text-foreground rounded-[2rem] relative">
        <div className="w-full  mx-auto flex flex-col justify-center items-center space-y-8 md:space-y-[65px] pt-12 lg:pt-[150px] ">
          <div className="flex flex-col items-start justify-center w-full max-w-6xl mx-auto gap-5 text-left">
            <h1 className="font-medium text-4xl sm:text-5xl leading-tight font-most text-teal-500">
              Efficiency At It&apos;s Peak
            </h1>
            <h3 className="text-xl text-gray-600  ">
              Double Your Productivity
            </h3>
            <Features></Features>
          </div>
        </div>
      </section>
      <section className="min-h-[30vh] w-full flex flex-col justify-center items-center py-16 px-4 bg-teal-500 overflow-hidden text-zinc-950 relative max-w-7xl mx-auto mt-10 rounded-[2rem]">
        <img src="/cool.svg" className="absolute inset-0 z-10 opacity-55"></img>

        <div className="relative z-10 flex flex-col items-center justify-center gap-6">
          <h1 className="font-medium text-4xl sm:text-5xl text-center  leading-tight font-most text-zinc-50">
            Start Organizing Your Web Research Today
          </h1>
          <p className="text-lg md:text-xl text-center max-w-xl text-zinc-50/80">
            Effortlessly capture, annotate, and share insights. No clutter. No
            hassle. Your knowledge, always at your fingertips.
          </p>

          <Button>Get Started Free</Button>
        </div>
      </section> */}

    </>
  );
}
