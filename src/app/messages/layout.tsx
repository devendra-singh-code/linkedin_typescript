import { Metadata } from "next";
import Message_Right from "./_message_right/page";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Messages",
};

export default function MessageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-5">
      <Header />
      <div className="w-full">
      {children}
      </div>
      <div className="md:w-[400px] w-full">
        <Message_Right />
      </div>
    </div>
  );
}
