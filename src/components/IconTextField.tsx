import Image from "next/image";
import { ChangeEventHandler } from "react";

export default function IconTextField({
  placeholder,
  name,
  type,
  "data-testid": dataTestid,
  onChange,
  src,
  alt,
  disabled = false,
}: {
  disabled: boolean;
  placeholder: string;
  name: string;
  type: string;
  "data-testid": string;
  src: string;
  alt: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="pb-4 relative">
      <Image
        className="pb-4 absolute top-3 left-3"
        src={src}
        alt={alt}
        width={24}
        height={24}
      />
      <input
        disabled={disabled}
        className="p-3 pl-12 border border-[#BDBDBD] rounded-lg w-full h-12 text-base font-normal placeholder:text-[#828282]"
        placeholder={placeholder}
        name={name}
        type={type}
        data-testid={dataTestid}
        onChange={onChange}
      />
    </div>
  );
}
