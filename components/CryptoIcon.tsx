import Image from "next/image";
import { useCallback, useRef } from "react";

type Props = {
  crypto: string;
};

export default function CryptoIcon({ crypto }: Props) {
  const img = useRef(null as null | HTMLImageElement);
  const hideOnFailure = useCallback(() => {
    if (img.current) {
      img.current.style.visibility = "hidden";
    }
  }, []);

  const fileName = `/crypto-icons-black/${crypto.toLowerCase()}@2x.png`;

  return <Image
    ref={img}
    src={fileName}
    alt=""
    width={32}
    height={32}
    onError={hideOnFailure}
  />
}