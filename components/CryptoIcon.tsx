import Image from "next/image";

type Props = {
  crypto: string;
};

export default function CryptoIcon({ crypto }: Props) {
  const fileName = `/crypto-icons-black/${crypto.toLowerCase()}@2x.png`;
  return <Image
    src={fileName}
    alt={" "}
    width={32}
    height={32}
  />
}