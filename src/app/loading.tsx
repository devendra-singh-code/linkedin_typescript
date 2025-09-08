import { Loader2 } from "lucide-react";
import logo from '../../assets/linkedin.png'
import Image from "next/image";
export default function loading(){
    return (
         <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
          <div className="flex flex-col items-center justify-center gap-2">
          <Image src={logo} alt="" className="w-[200px]" />
      {/* Spinner */}
      <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          </div>
    </div>
    )
}