import { Link, LinkProps } from "expo-router";
import React from "react";

type LinkButtonProps = LinkProps<string> & {
  title: string;
};

export default function LinkButton({ title, ...rest }: LinkButtonProps) {
  return (
    <Link
      className="text-slate-300 text-center text-base font-body border-2 p-3 rounded-md border-slate-50"
      {...rest}
    >
      {title}
    </Link>
  );
}
