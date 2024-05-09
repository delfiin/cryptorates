import { Direction } from "@/types";
import Image from "next/image";

type Props = {
  crypto: string;
  dir: Direction;
};

export default function CryptoIcon({ crypto, dir }: Props) {
  const fileName = `/crypto-icons-black/${crypto.toLowerCase()}@2x.png`;

  let styleAttr = {};
  if (dir === "rtl") {
    styleAttr = { float: "right" }
  };

  return <Image
    style={styleAttr}
    src={fileName}
    alt={" "}
    width={32}
    height={32}
  />
}