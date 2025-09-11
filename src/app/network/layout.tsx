import { Metadata } from "next";
import Network_Right from "./_network_right/page";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Newtork",
};

export default function NetworkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-5">
      <Header />
      <div className="flex md:flex-row gap-2 flex-col ">

      <div className="md:w-[370px] w-full">
      {children}
      </div>
      <div className=" w-full">
        <Network_Right />
      </div>
      </div>
    </div>
  );
}
