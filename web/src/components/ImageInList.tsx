import { DownloadSimple } from "@phosphor-icons/react";

import { communityImageProps } from "../pages/Home";
import { saveImage } from "../utils/saveImage";

export function ImageInList(item: communityImageProps) {
  return (
    <div className="relative shadow-md overflow-hidden border group">
      <img src={item.url} alt="" className="w-full transition-opacity" />
      <div className="p-3 flex flex-col text-white absolute left-2 right-2 bottom-2 opacity-0 group-hover:opacity-100 bg-zinc-900 rounded-xl transition-opacity">
        <span className="font-medium text-[11px] uppercase tracking-wider">
          "
          {item.prompt.length <= 50
            ? item.prompt
            : item.prompt.slice(0, 60).concat(" ...")}
          "
        </span>

        <div className="mt-3 flex items-center justify-between">
          <span className=" font-semibold text-xs">{item.user.name}</span>
          <DownloadSimple
            size={28}
            className="p-[5px] hover:bg-white/10 rounded-full"
            onClick={() => saveImage(item.url, item.id)}
          />
        </div>
      </div>
    </div>
  );
}
