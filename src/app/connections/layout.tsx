import Header from "@/components/Header";

import Connection_Right from "./_invitation_right/page";


export default function InvitationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-5">
      <Header />
      <div className=" w-full">{children}</div>
      <div className="md:w-[370px] w-full"><Connection_Right /></div>
    </div>
  );
}
